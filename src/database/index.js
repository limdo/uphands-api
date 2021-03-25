require('dotenv').config();

// 루트 디렉터리에 .env 파일 생성 후
//  - DB_HOST, DB_USER, DB_PASSWORD 설정하기
//  - e.g) DB_HOST=localhost

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
