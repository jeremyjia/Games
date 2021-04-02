const mysql = require('mysql2/promise');

const dbName = process.env.DB_SCHEMAS || "db1";
const odb = {
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || "3306",
    user     : process.env.DB_USER || "root",
    password : process.env.DB_PASSWORD || "group6db",
};



var e = {};
e.f1 = function(){
    mysql.createConnection(odb).then( connection => {
        connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then((res) => {
            console.info("Database create or successfully checked");
            process.exit(0);
        })
    });
    
    return "f1";
}
module.exports = e;