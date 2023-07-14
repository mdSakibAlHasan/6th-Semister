import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const { email, password } = req.body;

  console.log(email,"------------",password);

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

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
      const token = jwt.sign({ UserID: UserID }, "jwtkey",{ expiresIn: '1h' });
      res.status(200).json(token);
      // res.cookie('authCookieName', 'cookieValue', );
      // res.send('Login successful');
      //return res.status(200).json({ message: 'Login successful' });
    }  
  });
};
