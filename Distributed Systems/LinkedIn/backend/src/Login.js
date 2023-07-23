import { db } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const login = (req, res) => {
  const { email, password } = req.body;

  console.log(email,"------------",password);

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // const salt = bcrypt.genSaltSync(10);
  // const pass = bcrypt.hashSync(password);
  // console.log(pass,"=====");
  const query = 'SELECT * FROM UserInfo WHERE Email = ? AND Password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    else{
      const { UserID } = results[0];
      const token = jwt.sign({ UserID: UserID }, "jwtkey",{ expiresIn: '12h' });
      res.status(200).json(token);
    }  
  });
};
