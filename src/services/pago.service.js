const pool = require('../config/db');

const getPagos = async () => {
    const res = await pool.query(`
        SELECT p.*, u.nombres, u.apellido_paterno
        FROM pago p
        JOIN usuario u ON p.id_usuario = u.id_usuario
        ORDER BY p.fecha DESC
    `);
    return res.rows;
};

const getPagoById = async (id) => {
    const res = await pool.query(`
        SELECT p.*, u.nombres, u.apellido_paterno
        FROM pago p
        JOIN usuario u ON p.id_usuario = u.id_usuario
        WHERE p.id_pago = $1
    `, [id]);
    return res.rows[0];
};

const createPago = async (data) => {
    const { monto, id_usuario } = data;
    const res = await pool.query('INSERT INTO pago (monto, id_usuario) VALUES ($1, $2) RETURNING *', [monto, id_usuario]);
    return res.rows[0];
};

const updatePago = async (id, data) => {
    const { monto } = data;
    const res = await pool.query('UPDATE pago SET monto = $1 WHERE id_pago = $2 RETURNING *', [monto, id]);
    return res.rows[0];
};

const deletePago = async (id) => {
    await pool.query('DELETE FROM pago WHERE id_pago = $1', [id]);
};

module.exports = {
    getPagos,
    getPagoById,
    createPago,
    updatePago,
    deletePago
};