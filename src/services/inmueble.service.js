const pool = require('../config/db');

const getInmuebles = async () => {
    const res = await pool.query(`
        SELECT i.*, a.titulo, a.descripcion
        FROM inmueble i
        JOIN anuncio a ON i.id_anuncio = a.id_anuncio
        WHERE a.eliminado = false
        ORDER BY a.fecha_publicacion DESC
    `);
    return res.rows;
};

const getInmuebleById = async (id) => {
    const res = await pool.query(`
        SELECT i.*, a.titulo, a.descripcion
        FROM inmueble i
        JOIN anuncio a ON i.id_anuncio = a.id_anuncio
        WHERE i.id_anuncio = $1 AND a.eliminado = false
    `, [id]);
    return res.rows[0];
};

const createInmueble = async (data) => {
    const { id_anuncio, precio, tamano, ubicacion, modalidad, agua, electricidad, tipo } = data;
    const res = await pool.query(`
        INSERT INTO inmueble (id_anuncio, precio, tamano, ubicacion, modalidad, agua, electricidad, tipo)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
    `, [id_anuncio, precio, tamano, ubicacion, modalidad, agua, electricidad, tipo]);
    return res.rows[0];
};

const updateInmueble = async (id, data) => {
    const { precio, tamano, ubicacion, modalidad, agua, electricidad, tipo } = data;
    const res = await pool.query(`
        UPDATE inmueble SET precio = $1, tamano = $2, ubicacion = $3, modalidad = $4, agua = $5, electricidad = $6, tipo = $7
        WHERE id_anuncio = $8
        RETURNING *
    `, [precio, tamano, ubicacion, modalidad, agua, electricidad, tipo, id]);
    return res.rows[0];
};

const deleteInmueble = async (id) => {
    await pool.query('DELETE FROM inmueble WHERE id_anuncio = $1', [id]);
};

module.exports = {
    getInmuebles,
    getInmuebleById,
    createInmueble,
    updateInmueble,
    deleteInmueble
};