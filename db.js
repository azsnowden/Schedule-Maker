// Import the dotenv module
//call the config method
require('dotenv').config();

const pgp = require('pg-promise')({
    query:(e)=>console.log(e.query)
})

const db = pgp({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

console.log('db: pulled info from .env');
// console.log(db);


module.exports = db;