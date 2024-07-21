const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "", // e.g., 'localhost' for local setup or 'your-cloud-host' for cloud setup
  user: "",
  password: "",
  database: "",
});

//Connecting to database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to database");
  }
});

const secretKey = ""; // Use an environment variable for production

//Register API
app.post("/register", (req, res) => {
  const { firstName, lastName, phoneNumber, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  const query =
    "INSERT INTO users (first_name, last_name, phone_number, password) VALUES (?, ?, ?, ?)";
  db.query(
    query,
    [firstName, lastName, phoneNumber, hashedPassword],
    (err, result) => {
      if (err) {
        res
          .status(500)
          .send({ success: false, message: "Registration failed" });
      } else {
        res.send({ success: true });
      }
    }
  );
});

//Login API
app.post("/login", (req, res) => {
  const { phoneNumber, password } = req.body;
  const query = "SELECT * FROM users WHERE phone_number = ?";
  db.query(query, [phoneNumber], (err, results) => {
    if (err || results.length === 0) {
      res.status(401).send({ success: false, message: "Login failed" });
    } else {
      const user = results[0];
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res
          .status(401)
          .send({ success: false, message: "Invalid Password" });
      }
      const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: 86400 }); // 24 hours
      res.send({
        success: true,
        token,
        user: { firstName: user.first_name, lastName: user.last_name },
      });
    }
  });
});

app.post("/logout", (req, res) => {
  //Token deletion will be done by client side
  //Thats why directly responding with success
  res.send({ success: true });
});

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res
      .status(403)
      .send({ success: false, message: "No token provided." });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .send({ success: false, message: "Failed to authenticate token." });
    }
    req.userId = decoded.id;
    next();
  });
};

// Protect any routes by adding the verifyToken middleware
app.get("/protected", verifyToken, (req, res) => {
  res.send({ success: true, message: "This is a protected route." });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
