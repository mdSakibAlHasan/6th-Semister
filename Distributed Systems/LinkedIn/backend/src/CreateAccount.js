import { db } from "../db.js";

export const CreateAccount = (req, res) => {
  const { name, email, password } = req.body;

  // Validate the input data
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please provide all required fields." });
  }

  // Check if the user already exists in the database
  db.query("SELECT * FROM UserInfo WHERE Email = ?", [email], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error." });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: "User already exists." });
    }

    // Insert the user into the database
    db.query(
      "INSERT INTO UserInfo (Name, Email, Password) VALUES (?, ?, ?)",
      [name, email, password],
      (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ message: "Internal server error." });
        }

        return res.status(201).json({ message: "User registered successfully." });
      }
    );
  });
};
