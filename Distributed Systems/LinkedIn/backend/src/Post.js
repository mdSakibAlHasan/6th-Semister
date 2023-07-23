import { db } from "../db.js";
import multer from "multer";
import  Jwt  from "jsonwebtoken";
import { Client as Minio } from 'minio';
import fs from "fs";


export const minioClient = new Minio({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'Kog2dOivleEhnlFPYmzh',
  secretKey: 'dcG78bx6QVHvQp6t86xLFG17opojk6xSseJ5tdwX',
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });


function getCurrentTimestamp() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Note: Months are zero-based
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const setPostInfo =  (req, res, next) => {
    try {
      upload.single("file")(req, res, (err) => {
        const {text, cookie} = req.body;
        const file = req.file;
        const filePath = (file && file.path);
        const metaData = (file&&  {
          'Content-Type': file.mimetype,
          'X-Amz-Meta-Testing': 1234,
        });
        
        if (err instanceof multer.MulterError) {
          console.log(err);
          return res.status(400).json({ error: "Multer error" });
        } else if (err) {
          console.log(err);
          return res.status(500).json({ error: "Internal server error" });
        }

        var path =(req.file && req.file.filename);
        const fileStream = (file && fs.createReadStream(filePath));
        const time = getCurrentTimestamp();
        //console.log(req.file,"///////",path,"==========",text,"======",cookie);
        Jwt.verify(cookie, "jwtkey", (err, userInfo) => {
          if(err){
            return res.status(401).json("Not authenticated!");
          }
          
          if(path){
            minioClient.putObject('likedin', file.filename, fileStream, metaData, function (
              err,
              etag
            ){
              if (err) {
                return console.log(err);
              }
              path = `http://127.0.0.1:9000/likedin/${file.filename}`;
              console.log(path); 
              const query = 'INSERT INTO PostInfo (UserID, Text, Image, PostTime) VALUES (?, ?, ?, ?)';
              db.query(query, [userInfo.UserID, text, path, time], (err, results) => {
                if (err) {
                  console.error('Error storing variables in the database:', err);
                  return res.status(500).json("Internal server error");;
                }

                console.log('Variables stored in the database:', results);
              });
            }); 
          }
          else{
            const query = 'INSERT INTO PostInfo (UserID, Text, Image, PostTime) VALUES (?, ?, ?, ?)';
            db.query(query, [userInfo.UserID, text, null, time], (err, results) => {
              if (err) {
                console.error('Error storing variables in the database:', err);
                return res.status(500).json("Internal server error");;
              }

              console.log('Variables stored in the database:', results);
            });
          } 
        })
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };