const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'your-database-host', // e.g., 'localhost' for local setup or 'your-cloud-host' for cloud setup
  user: 'yourusername',
  password: 'yourpassword',
  database: 'yourdatabase'
});

//Connecting to database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to database');
  }
});

//Register API
app.post('/register', (req, res) => {
  const { firstName, lastName, phoneNumber, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  const query = 'INSERT INTO users (first_name, last_name, phone_number, password) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [firstName, lastName, phoneNumber, hashedPassword], (err, result) => {
    if (err) {
      res.status(500).send({ success: false, message: 'Registration failed' });
    } else {
      res.send({ success: true });
    }
  });
});


//Login API
app.post('/login', (req, res) => {
  const { phoneNumber, password } = req.body;
  const query = 'SELECT * FROM users WHERE phoneNumber = ?';
  db.query(query, [phoneNumber], (err, results) => {
    if (err || results.length === 0) {
      res.status(401).send({ success: false, message: 'Login failed' });
    } else {
      const user = results[0];
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({ success: false, message: 'Login failed' });
      }
      res.send({ success: true });
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
