import 'dotenv/config';

import mysql  from "mysql2";

// Create the connection to database
export const connect = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
console.log("Connected to mysql database... ", process.env.DB_HOST);

// // Connect to the database
// connect.connect((err) => {
//   if (err) {
//     console.error("Error connecting to the database:", err);
//     return;
//   }
//   console.log("Connected to the MySQL database");
// });
// export default connect;