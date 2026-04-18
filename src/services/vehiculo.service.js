const pool = require('../config/db');
const anuncioService = require('./anuncio.service');

// ➕ Crear vehículo (🔥 compuesto)
const createVehiculo = async (data) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // 1. Crear anuncio base
        const anuncio = await anuncioService.createAnuncio(data, client);

        // 2. Crear vehiculo
        const res = await client.query(
            `INSERT INTO vehiculo (
                id_anuncio, precio, marca, modelo, anio, categoria, combustible, puertas, traccion, color, cilindrada, kilometraje,
                retrovisores_electricos, neblineros, aire, full_equipo, parlantes, radio_cd, radio_mp3,
                aros, aros_aleacion, parrilla, luces_alogenas,
                localizador_gps, airbag, laminas_seguridad, blindado, faros_antiniebla_traseros, faros_antiniebla_delanteros, inmovilizador_motor, repartidor_electronico_frenado, frenos_abs, alarma,
                sunroof, asientos_cuero, climatizador, estado_vehiculo
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,
                $13, $14, $15, $16, $17, $18, $19,
                $20, $21, $22, $23,
                $24, $25, $26, $27, $28, $29, $30, $31, $32, $33,
                $34, $35, $36, $37
            )
            RETURNING *`,
            [
                anuncio.id_anuncio,
                data.precio, data.marca, data.modelo, data.anio, data.categoria_vehiculo || null, data.combustible, data.puertas, data.traccion, data.color, data.cilindrada, data.kilometraje,
                data.retrovisores_electricos || false, data.neblineros || false, data.aire || false, data.full_equipo || false, data.parlantes || false, data.radio_cd || false, data.radio_mp3 || false,
                data.aros || false, data.aros_aleacion || false, data.parrilla || false, data.luces_alogenas || false,
                data.localizador_gps || false, data.airbag || false, data.laminas_seguridad || false, data.blindado || false, data.faros_antiniebla_traseros || false, data.faros_antiniebla_delanteros || false, data.inmovilizador_motor || false, data.repartidor_electronico_frenado || false, data.frenos_abs || false, data.alarma || false,
                data.sunroof || false, data.asientos_cuero || false, data.climatizador || false, data.estado_vehiculo
            ]
        );

        await client.query('COMMIT');

        return {
            anuncio,
            vehiculo: res.rows[0]
        };

    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

// 🔍 Obtener todos los vehículos
const getVehiculos = async () => {
    const res = await pool.query(`
        SELECT a.*, v.*
        FROM vehiculo v
        JOIN anuncio a ON v.id_anuncio = a.id_anuncio
        WHERE a.eliminado = false
        ORDER BY a.fecha_publicacion DESC
    `);
    return res.rows;
};

// 🔍 Obtener por ID
const getVehiculoById = async (id) => {
    const res = await pool.query(`
        SELECT a.*, v.*
        FROM vehiculo v
        JOIN anuncio a ON v.id_anuncio = a.id_anuncio
        WHERE v.id_anuncio = $1 AND a.eliminado = false
    `, [id]);

    return res.rows[0];
};

// ❌ eliminar (usa anuncio)
const deleteVehiculo = async (id) => {
    const anuncioService = require('./anuncio.service');
    await anuncioService.deleteAnuncio(id);
};

module.exports = {
    createVehiculo,
    getVehiculos,
    getVehiculoById,
    deleteVehiculo
};