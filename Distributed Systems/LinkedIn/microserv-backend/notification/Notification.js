import { db } from "./db.js";
import  Jwt  from "jsonwebtoken";
import axios from "axios";


export function getCurrentTimestamp() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Note: Months are zero-based
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }


export const getNotification = async (req, res, next) => {
    try{
    const cookie = req.headers.cookie;
    const token = cookie.split("=")[1];
    console.log(token);

    Jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err){
            console.log(err);
            return res.status(401).json("Not authenticated!");
        }
        console.log("UserInfo: ",userInfo.UserID);
        const query = 'select PostID, Name, UserID from Notification where UserID = ? and Status = true;';
        db.query(query, [userInfo.UserID], (err, results) => {
            if (err) {
                console.error('Error get information from database:', err);
                return res.status(500).json("Internal server error");
            }

            const posts = results.map((row) => ({
                PostID: row.PostID,
                Name: row.Name,
                UserID: row.UserID,
            }));
            axios.post('http://localhost:3006/app/getNotificationDetails', { posts })
            .then((response) => {
                return res.status(200).send(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        });
    })
    }
    catch(err){
        console.log(err);
        return res.status(500).json("Internal server err");
    }
  };

  export const setNotification = async (req,res) =>{
    const { PostID, UserID } = req.body;
    console.log(req.body);
    axios.post('http://localhost:3005/app/getNotificationUserName', {UserID:UserID })
        .then((response) => {
            // Handle the response from server1
            
            console.log(response.data," is the name add data");
            res.status(200).json("successfull update");
            const values = response.data.map((item) => [PostID,item.UserID,1, item.Name,]);
            const sql = 'INSERT INTO Notification (PostID,UserID,Status, Name) VALUES ?';
            console.log(values);
            // Execute the query
            db.query(sql, [values], (error, results) => {
            if (error) {
                console.error('Error inserting data:', error);
            } else {
                console.log('Data inserted successfully:', results);
            }
            });
        })
        .catch((error) => {
            // Handle errors
            console.error(error);
            res.status(500).json("Internal rror");
        });
  }


  export const getPostDetails = (req,res) =>{
    const { PostID, UserID } = req.body;
    console.log(req.body);

    const querey = `update Notification set status=0 where PostID = ${PostID} and UserID = ${UserID};`;
    console.log(querey);
    db.query(querey,(err, result)=>{
        if(err){
            console.log("Error to get post info");
            res.status(500).json("Err to querey");
        }
        else{
            console.log("COmplete querey",result);
            res.status(200).json("Complete notice");
        }
    })
  }

  export const NotificationCleaner = () =>{
    const currentTime = getCurrentTimestamp();
    const querey = `DELETE FROM Notification WHERE PostID in (select PostID from PostInfo where TIMEDIFF('${currentTime}',PostTime)>'32:00:03' );`;
    console.log(querey);
    db.query(querey, (err, results) => {
      console.log(results,err);
    });
  }

  setInterval(NotificationCleaner,500000000); //after 5000 s


  
