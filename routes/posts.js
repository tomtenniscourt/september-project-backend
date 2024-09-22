const express = require("express");
const { Pool } = require("pg");

const router = express.Router();
const pool = new Pool({
  user: "tomcourt", // Your PostgreSQL username
  host: "localhost",
  database: "september_api",
  password: "K983mwhatsername!", // Your PostgreSQL password
  port: 5432,
});

// CREATE a new post
router.post("/", async (req, res) => {
  const { title, body, user_id } = req.body;
  if (!title || !body || !user_id) {
    return res
      .status(400)
      .json({ error: "Title, body, and user ID are required." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO posts (title, body, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, body, user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Post creation failed." });
  }
});

// READ all posts
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving posts." });
  }
});

// UPDATE a post
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  if (!title && !body) {
    return res.status(400).json({ error: "Title or body is required." });
  }

  const query =
    "UPDATE posts SET title = COALESCE($1, title), body = COALESCE($2, body) WHERE id = $3 RETURNING *";
  const values = [title, body, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found." });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating post." });
  }
});

// DELETE a post
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM posts WHERE id = $1 RETURNING *";
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found." });
    }
    res.json({ message: "Post deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting post." });
  }
});

module.exports = router;
