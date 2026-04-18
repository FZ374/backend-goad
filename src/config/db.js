require('dotenv').config();


const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

module.exports = pool;


async function testDB() {
  const res = await pool.query('SELECT NOW()');
  console.log(res.rows);
}

testDB();