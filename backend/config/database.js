const mysql=require("mysql2");
require("dotenv").config();

const db=mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

db.connect((err)=>{
    if (err) {
        console.log("Database connection failed:", err);
        console.log(err);
        return;
    }
    else {
        console.log("Database connected successfully");
    }
})

module.exports= db;