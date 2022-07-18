import dotenv from 'dotenv';
dotenv.config();
const mysql = require('mysql2');

// use .promise() so that we can use await on connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'todos_db',
}).promise();

module.exports = connection;