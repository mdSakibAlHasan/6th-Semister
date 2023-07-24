import { db } from "../db.js";
import  Jwt  from "jsonwebtoken";

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
        const query = `select Notification.PostID, UserInfo.Name, PostInfo.PostTime, PostInfo.Image, PostInfo.Text from Notification, PostInfo, UserInfo 
        where Notification.PostID = PostInfo.PostID and PostInfo.UserID = UserInfo.UserID
        and Notification.UserID = ? and Notification.Status = true;`;
        db.query(query, [userInfo.UserID], (err, results) => {
            if (err) {
                console.error('Error get information from database:', err);
                return res.status(500).json("Internal server error");
            }

            console.log(results);
            return res.status(200).send(results);
        });
    })
    }
    catch(err){
        console.log(err);
        return res.status(500).json("Internal server err");
    }
  };


  export const getPostDetails = (req,res) =>{
    const { PostID, UserID } = req.body;
    console.log(req.body);
    // const cookie = req.headers.cookie;
    // const token = cookie.split("=")[1];
    // console.log(token);
    const querey = `select * from PostInfo where PostID = ${PostID};`;
    console.log(querey);
    db.query(querey,(err, result)=>{
        if(err){
            console.log("Error to get post info");
            res.status(500).json("Err to querey");
        }
        else{
            console.log("COmplete querey",result);
            res.status(200).send(result);
        }
    })
  }

  
  export const getID = (req, res) => {
    try {
      const cookie = req.headers.cookie;
      const token = cookie.split("=")[1];
      console.log(token);
  
      Jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) {
          console.log(err);
          return res.status(401).json("Not authenticated!");
        }
        return res.send(userInfo.UserID);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json("Internal server error");
    }
  };
  