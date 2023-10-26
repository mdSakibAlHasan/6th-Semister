import mysql2 from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();


export const db = mysql2.createConnection({
  host: "mysql_notification",              //for docker replace mysql
  port: 3309,
  user: "root",
  password: "password",
  database: "likedin",
});

db.connect();