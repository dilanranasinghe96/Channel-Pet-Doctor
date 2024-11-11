const {createPool} = require('mysql');

const pool=createPool({
    port:process.env.DB_PORT,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PWD,
    database:process.env.DB_NAME,
    connectionLimit:process.env.DN_CONN_LIMIT
});

module.exports=pool;