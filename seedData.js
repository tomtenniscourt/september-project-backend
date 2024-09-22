// const { Pool } = require("pg");

// // Create a new pool instance
// const pool = new Pool({
//   user: "tomcourt", // Replace with your PostgreSQL username
//   host: "localhost",
//   database: "september_api", // Replace with your database name
//   password: "K983mwhatsername!", // Replace with your PostgreSQL password
//   port: 5432,
// });

// // Sample data to seed
// const samplePosts = [
//   {
//     title: "First Post",
//     body: "This is the content of the first post.",
//     user_id: 1, // Change as needed
//   },
//   {
//     title: "Second Post",
//     body: "This is the content of the second post.",
//     user_id: 1, // Change as needed
//   },
//   {
//     title: "Third Post",
//     body: "This is the content of the third post.",
//     user_id: 1, // Change as needed
//   },
//   // Add more posts as needed
// ];

// const seedData = async () => {
//   try {
//     for (const post of samplePosts) {
//       const result = await pool.query(
//         "INSERT INTO posts (title, body, user_id) VALUES ($1, $2, $3) RETURNING *",
//         [post.title, post.body, post.user_id]
//       );
//       console.log("Inserted:", result.rows[0]);
//     }
//   } catch (error) {
//     console.error("Error seeding data:", error);
//   } finally {
//     await pool.end();
//   }
// };


// seedData();

// // Run the seeding function with node seedData.js in the terminal 