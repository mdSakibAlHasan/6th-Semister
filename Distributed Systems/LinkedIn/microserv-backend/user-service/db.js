import mysql2 from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();


export const db = mysql2.createConnection({
  host: "mysql",          //put here mysql
  port: 3307, 
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "likedin",
});

db.connect();