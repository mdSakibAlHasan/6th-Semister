import { db } from "../db.js";
import  Jwt  from "jsonwebtoken";

export const getPostInfo = async (req, res, next) => {
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
        const query = 'SELECT PostID, UserInfo.UserID, Text, Image, PostTime, Name  FROM UserInfo JOIN PostInfo ON PostInfo.UserID = UserInfo.UserID where PostInfo.UserID <> ?;';
        db.query(query, [userInfo.UserID], (err, results) => {
            if (err) {
                console.error('Error get information from database:', err);
                return res.status(500).json("Internal server error");;
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