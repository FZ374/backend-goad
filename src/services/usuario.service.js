const pool = require('../config/db');

const getUsuarios = async () => {
  const res = await pool.query('SELECT * FROM usuario');
  return res.rows;
};

const createUsuario = async (data) => {
  const { dni, nombres, apellido_paterno, email, passw } = data;

  const res = await pool.query(
    `INSERT INTO usuario (dni, nombres, apellido_paterno, email, passw, rol)
     VALUES ($1,$2,$3,$4,$5,'cliente') RETURNING *`,
    [dni, nombres, apellido_paterno, email, passw]
  );

  return res.rows[0];
};

module.exports = { getUsuarios, createUsuario };