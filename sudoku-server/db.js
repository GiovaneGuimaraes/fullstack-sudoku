const mysql = require('mysql2');

const pool = mysql.createPool({
    user: 'root',
    host: 'localhost',
    database: 'sudoku-db-javascript',
    password: 'root',
    port: 3306,
});

module.exports = pool;