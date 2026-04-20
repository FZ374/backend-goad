const pool = require('../config/db');

const getFavoritos = async () => {
    const res = await pool.query(`
        SELECT f.*, u.nombres, u.apellido_paterno, a.titulo
        FROM favoritos f
        JOIN usuario u ON f.id_usuario = u.id_usuario
        JOIN anuncio a ON f.id_anuncio = a.id_anuncio
        ORDER BY f.fecha DESC
    `);
    return res.rows;
};

const getFavoritoById = async (id) => {
    const res = await pool.query(`
        SELECT f.*, u.nombres, u.apellido_paterno, a.titulo
        FROM favoritos f
        JOIN usuario u ON f.id_usuario = u.id_usuario
        JOIN anuncio a ON f.id_anuncio = a.id_anuncio
        WHERE f.id_favorito = $1
    `, [id]);
    return res.rows[0];
};

const createFavorito = async (data) => {
    const { id_usuario, id_anuncio } = data;
    const res = await pool.query('INSERT INTO favoritos (id_usuario, id_anuncio) VALUES ($1, $2) RETURNING *', [id_usuario, id_anuncio]);
    return res.rows[0];
};

const updateFavorito = async (id, data) => {
    const res = await pool.query('UPDATE favoritos SET fecha = CURRENT_TIMESTAMP WHERE id_favorito = $1 RETURNING *', [id]);
    return res.rows[0];
};

const deleteFavorito = async (id) => {
    await pool.query('DELETE FROM favoritos WHERE id_favorito = $1', [id]);
};

module.exports = {
    getFavoritos,
    getFavoritoById,
    createFavorito,
    updateFavorito,
    deleteFavorito
};