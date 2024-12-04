// import the mysql2 module promise wrapper
const mysql = require("mysql2/promise");
// Prepare connection parameters we use to connect to the database 
const dbConfig = {
   connectonlimit: 10,
    host: process.env.DB_HOST,

    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
};
// Create a connection pool
const pool = mysql.createPool(dbConfig);
// prepare a function that will excute sql queries asncronously
async function query(sql, params) {
const[rows, fields] = await pool.execute(sql, params);
return rows;
}
// export the query function for use the application
module.exports = { query };