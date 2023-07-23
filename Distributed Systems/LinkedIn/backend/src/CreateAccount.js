import { db } from "../db.js";
import bcrypt from "bcryptjs";

export const CreateAccount = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please provide all required fields." });
  }

  // const salt = bcrypt.genSaltSync(10);
  // const pass = bcrypt.hashSync(password, salt);

  db.query("SELECT * FROM UserInfo WHERE Email = ?", [email], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Internal server error." });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: "Email already exists." });
    }
    else{
      db.query(
        "INSERT INTO UserInfo (Name, Email, Password) VALUES (?, ?, ?)",
        [name, email, pass],
        (error, results) => {
          if (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error." });
          }

          return res.status(200).json({ message: "User registered successfully." });
        }
      );
    }

  });
};
