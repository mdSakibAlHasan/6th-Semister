import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    user: "sakib",
    password: "passsword",
    database: "likedin"
})

db.connect(function(err) {
    if (err) {
        console.log("problem");
        throw err;
    }
       
    console.log("Connected!");
});