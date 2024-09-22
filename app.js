const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// PostgreSQL client setup
const pool = new Pool({
  user: "tomcourt", // Replace with your PostgreSQL username
  host: "localhost",
  database: "september_api", // Replace with your database name
  password: "K983mwhatsername!", // Replace with your PostgreSQL password
  port: 5432,
});

// Use authentication and user routes
app.use("/api/auth", authRoutes(pool)); // Ensure you pass the pool to the auth routes
app.use("/api/users", userRoutes(pool)); // Ensure you pass the pool to the user routes

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});

// Root route
app.get("/", (req, res) => {
  res.send(
    "API is successfully running. Use /api/auth to access authentication endpoints."
  );
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
