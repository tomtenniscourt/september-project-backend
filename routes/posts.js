const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const router = express.Router();
const { Pool } = require("pg");

const pool = new Pool({
  user: "tomcourt",
  host: "localhost",
  database: "september_api",
  password: "K983mwhatsername!",
  port: 5432,
});

// Create a post (protected)
router.post("/", authenticateToken, async (req, res) => {
  const { title, body } = req.body;
  const userId = req.user.id;

  const query =
    "INSERT INTO posts (title, body, user_id) VALUES ($1, $2, $3) RETURNING *";
  const values = [title, body, userId];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Update a post (protected)
router.put("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  const query =
    "UPDATE posts SET title = $1, body = $2 WHERE id = $3 RETURNING *";
  const values = [title, body, id];

  try {
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Delete a post (protected)
router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM posts WHERE id = $1 RETURNING *";
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(204).send(); // No content
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
