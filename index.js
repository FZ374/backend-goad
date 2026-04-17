const express = require('express');
const app = express();
const pool = require('./src/config/db');

app.get('/usuarios', async (req, res) => {
  const result = await pool.query('SELECT * FROM usuario');
  res.json(result.rows);
});

app.listen(3000, () => console.log('Servidor OK'));