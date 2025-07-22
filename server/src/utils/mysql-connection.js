var mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "admin",
  database: "palsdb",
});

// var connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   port: process.env.DB_HOST,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

module.exports = connection;
