import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2';

// use .promise() so that we can use await on connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'employees_db',
}).promise();

export {connection};