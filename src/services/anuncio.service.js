const pool = require('../config/db');

// 🔍 Obtener todos
const getAnuncios = async () => {
    const res = await pool.query(`
        SELECT a.*, u.nombres, c.nombre AS categoria
        FROM anuncio a
        JOIN usuario u ON a.id_usuario = u.id_usuario
        JOIN categoria c ON a.id_categoria = c.id_categoria
        WHERE a.eliminado = false
        ORDER BY a.fecha_publicacion DESC
    `);
    return res.rows;
};

// 🔍 Obtener por ID
const getAnuncioById = async (id) => {
    const res = await pool.query(
        `SELECT * FROM anuncio WHERE id_anuncio = $1 AND eliminado = false`,
        [id]
    );
    return res.rows[0];
};

// ➕ Crear (🔥 ahora soporta transacciones)
const createAnuncio = async (data, client = null) => {
    const db = client || pool;

    const {
        titulo,
        descripcion,
        latitud,
        longitud,
        numero_telefono,
        id_usuario,
        id_categoria
    } = data;

    const res = await db.query(
        `INSERT INTO anuncio 
        (titulo, descripcion, latitud, longitud, numero_telefono, id_usuario, id_categoria)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING *`,
        [titulo, descripcion, latitud, longitud, numero_telefono, id_usuario, id_categoria]
    );

    return res.rows[0];
};

// ✏️ Actualizar
const updateAnuncio = async (id, data) => {
    const { titulo, descripcion, estado, numero_telefono } = data;

    const res = await pool.query(
        `UPDATE anuncio 
         SET titulo=$1, descripcion=$2, estado=$3, numero_telefono=$4
         WHERE id_anuncio=$5
         RETURNING *`,
        [titulo, descripcion, estado, numero_telefono, id]
    );

    return res.rows[0];
};

// ❌ Eliminar lógico
const deleteAnuncio = async (id) => {
    await pool.query(
        `UPDATE anuncio SET eliminado = true WHERE id_anuncio = $1`,
        [id]
    );
};

// 👁️ Incrementar vistas
const incrementarVistas = async (id) => {
    await pool.query(
        `UPDATE anuncio SET vistas = vistas + 1 WHERE id_anuncio = $1`,
        [id]
    );
};

// 📸 Guardar imagen
const addImagen = async (id_anuncio, filename) => {
    const url = `/uploads/${filename}`;

    const res = await pool.query(
        `INSERT INTO imagen (url, id_anuncio)
         VALUES ($1, $2)
         RETURNING *`,
        [url, id_anuncio]
    );

    return res.rows[0];
};

// 📸 Obtener imágenes de un anuncio
const getImagenesByAnuncio = async (id_anuncio) => {
    const res = await pool.query(
        `SELECT * FROM imagen WHERE id_anuncio = $1`,
        [id_anuncio]
    );

    return res.rows;
};

module.exports = {
    getAnuncios,
    getAnuncioById,
    createAnuncio,
    updateAnuncio,
    deleteAnuncio,
    incrementarVistas,
    addImagen,
    getImagenesByAnuncio
};