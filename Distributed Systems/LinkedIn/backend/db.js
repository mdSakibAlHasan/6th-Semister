// import mysql from "mysql";

// export const db = mysql.createConnection({
//     host: "localhost",
//     user: "sakib",
//     password: "passsword",
//     database: "likedin"
// })

// db.connect(function(err) {
//     if (err) {
//         console.log("problem");
//         throw err;
//     }
       
//     console.log("Connected!");
// });
//const mysql2 = require("mysql2");
import mysql2 from 'mysql2';

export const db = mysql2.createConnection({
  host: "localhost",
  user: "sakib",
  password: "password",
  database: "likedin",
});

db.connect();