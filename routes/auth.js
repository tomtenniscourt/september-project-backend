const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Accept pool as an argument
const init = (pool) => {
  // User registration
  router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const result = await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
        [username, hashedPassword]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "User registration failed." });
    }
  });

  // User login
  router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      if (rows.length === 0) {
        return res.status(404).json({ error: "User not found." });
      }
      const user = rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password." });
      }
      const token = jwt.sign({ id: user.id }, "your_generated_secret", {
        expiresIn: "1h",
      });
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Login failed." });
    }
  });

  return router;
};

module.exports = init;
