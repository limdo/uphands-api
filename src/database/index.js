require('dotenv').config();

const db = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : 'uphands',
    }
});

module.exports = db
