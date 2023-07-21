import { db } from "../db.js";
import  Jwt  from "jsonwebtoken";
import fs from "fs";
import path from 'path';
//import img from './../save/a.jpg';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

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
        const query = 'SELECT PostID, UserInfo.UserID, Text, Image, PostTime, Name  FROM UserInfo JOIN PostInfo ON PostInfo.UserID = UserInfo.UserID where PostInfo.UserID <> ? ORDER BY PostInfo.PostTime DESC;';
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


export const getPhoto = async(req,res) =>{
    const { image} = req.query;

  const currentFilePath = fileURLToPath(import.meta.url);
  console.log(currentFilePath," cF ")
  const currentDirPath = dirname(currentFilePath);
  console.log(currentDirPath," cD")
  const sourceDirPath = path.join(currentDirPath, '../uploads');
  const imagePath = path.join(sourceDirPath, image);
  

  console.log(imagePath);
  res.sendFile(imagePath);
    
}