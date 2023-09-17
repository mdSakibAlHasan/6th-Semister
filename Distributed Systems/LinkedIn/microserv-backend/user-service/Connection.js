import { db } from "./db.js";
import  Jwt  from "jsonwebtoken";
import fs from "fs";
import path from 'path';
//import img from './../save/a.jpg';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const getUserName = async (req, res) => {
     const originalArray = req.body.data;

     const modifiedArray = originalArray.map((item) => {
         const name = findNameByUserID(item.UserID); // Implement this function
         return { ...item, UserName: name };
     });
 
     res.json(modifiedArray);
};

function findNameByUserID(userID) {
    const querey= 'select Name from UserInfo where UserID=?;';
    db.query(querey, [userID], (err, result) => {
        if (err) {
            console.error('Error get information from database:', err);
            return res.status(500).json("Internal server error");;
        }

        console.log(result['Name']);
    });
    return result['Name'];
}
