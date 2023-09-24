import { db } from "./db.js";
import  Jwt  from "jsonwebtoken";
import fs from "fs";
import path from 'path';
//import img from './../save/a.jpg';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const getUserName = async (req, res) => {
    const originalArray = req.body.posts;

    const modifiedArray = await Promise.all(
        originalArray.map(async (item) => {
            try {
                const name = await findNameByUserID(item.UserID);
                return { ...item, UserName: name };
            } catch (err) {
                // Handle errors here if needed
                console.error('Error getting name by UserID:', err);
                return { ...item, UserName: null }; // You can set a default value if an error occurs
            }
        })
    );

    //console.log('Modified Array:', modifiedArray);
    res.json(modifiedArray);
};

function findNameByUserID(userID) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT Name FROM UserInfo WHERE UserID = ?';
        db.query(query, [userID], (err, result) => {
            if (err) {
                console.error('Error querying the database:', err);
                reject(err);
            } else if (result.length > 0) {
                resolve(result[0].Name);
            } else {
                resolve(null); // Handle the case where no result is found for the given userID
            }
        });
    });
}

