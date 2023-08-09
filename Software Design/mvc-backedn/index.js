const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3001;

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'sakib',
  password: 'password',
  database: 'mvc'
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});


app.use(express.json());
app.post('/register', (req, res) => {
  const { email, password, name } = req.body;
  console.log(email,name,password,"-----------------");

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please provide all required fields." });
  }
  else if(password.length<8){
    return res.status(400).json({ message: "Password should 8 character long." });
  }
  
  const query = 'INSERT INTO UserInfo (Name, Email, Password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'An error occurred while saving data.' });
    }

    return res.status(200).json({ message: 'User registered successfully.' });
  });
});


app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  const intervalId = setInterval(() => {
    const query = 'SELECT COUNT(*) AS row_count FROM UserInfo';
    db.query(query, (err, result) => {
      if (err) {
        console.error(err);
        console.log("error");
        return; // Exit early on error
      }
      const row = result[0].row_count;
      //console.log(row, "-----");
      sendEvent({ message: row });
    });
  }, 1000);

  req.on('close', () => {
    clearInterval(intervalId);
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
