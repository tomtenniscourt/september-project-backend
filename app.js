const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const userRoutes = require("./routes/users");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// PostgreSQL client setup
const pool = new Pool({
  user: "your_postgres_user", // Replace with your PostgreSQL username
  host: "localhost",
  database: "your_database_name", // Replace with your database name
  password: "your_postgres_password", // Replace with your PostgreSQL password
  port: 5432,
});

// Use user routes
app.use("/api/users", userRoutes(pool));

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
