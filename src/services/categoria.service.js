const pool = require('../config/db');

const getCategorias = async () => {
    const res = await pool.query('SELECT * FROM categoria ORDER BY nombre');
    return res.rows;
};

const getCategoriaById = async (id) => {
    const res = await pool.query('SELECT * FROM categoria WHERE id_categoria = $1', [id]);
    return res.rows[0];
};

const createCategoria = async (data) => {
    const { nombre } = data;
    const res = await pool.query('INSERT INTO categoria (nombre) VALUES ($1) RETURNING *', [nombre]);
    return res.rows[0];
};

const updateCategoria = async (id, data) => {
    const { nombre } = data;
    const res = await pool.query('UPDATE categoria SET nombre = $1 WHERE id_categoria = $2 RETURNING *', [nombre, id]);
    return res.rows[0];
};

const deleteCategoria = async (id) => {
    await pool.query('DELETE FROM categoria WHERE id_categoria = $1', [id]);
};

module.exports = {
    getCategorias,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria
};