const pool = require('../config/db');

const getEmpleos = async () => {
    const res = await pool.query(`
        SELECT e.*, a.titulo, a.descripcion
        FROM empleo e
        JOIN anuncio a ON e.id_anuncio = a.id_anuncio
        WHERE a.eliminado = false
        ORDER BY a.fecha_publicacion DESC
    `);
    return res.rows;
};

const getEmpleoById = async (id) => {
    const res = await pool.query(`
        SELECT e.*, a.titulo, a.descripcion
        FROM empleo e
        JOIN anuncio a ON e.id_anuncio = a.id_anuncio
        WHERE e.id_anuncio = $1 AND a.eliminado = false
    `, [id]);
    return res.rows[0];
};

const createEmpleo = async (data) => {
    const { id_anuncio, sueldo, tipo_empleo } = data;
    const res = await pool.query(`
        INSERT INTO empleo (id_anuncio, sueldo, tipo_empleo)
        VALUES ($1, $2, $3)
        RETURNING *
    `, [id_anuncio, sueldo, tipo_empleo]);
    return res.rows[0];
};

const updateEmpleo = async (id, data) => {
    const { sueldo, tipo_empleo } = data;
    const res = await pool.query(`
        UPDATE empleo SET sueldo = $1, tipo_empleo = $2
        WHERE id_anuncio = $3
        RETURNING *
    `, [sueldo, tipo_empleo, id]);
    return res.rows[0];
};

const deleteEmpleo = async (id) => {
    await pool.query('DELETE FROM empleo WHERE id_anuncio = $1', [id]);
};

module.exports = {
    getEmpleos,
    getEmpleoById,
    createEmpleo,
    updateEmpleo,
    deleteEmpleo
};