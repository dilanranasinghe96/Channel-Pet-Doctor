const mysql = require('mysql2'); // Use mysql2 instead of mysql

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
});

// Export the pool for use in other parts of the application
module.exports = pool;
