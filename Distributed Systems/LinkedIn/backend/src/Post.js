import { db } from "../db.js";
import multer from "multer";
import  Jwt  from "jsonwebtoken";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

export const setPostInfo = async (req, res, next) => {
    try {
      upload.single("file")(req, res, (err) => {
        const {text, cookie} = req.body;
        
        if (err instanceof multer.MulterError) {
          console.log(err);
          return res.status(400).json({ error: "Multer error" });
        } else if (err) {
          // Handle other errors
          console.log(err);
          return res.status(500).json({ error: "Internal server error" });
        }
        const path =(req.file && req.file.filename);
        //console.log(req.file,"///////",path,"==========",text,"======",cookie);
        Jwt.verify(cookie, "jwtkey", (err, userInfo) => {
          if(err){

          }
          console.log("UserInfo: ",userInfo.UserID);
        })
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };