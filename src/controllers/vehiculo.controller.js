const service = require('../services/vehiculo.service');

const getVehiculos = async (req, res) => {
    const data = await service.getVehiculos();
    res.json(data);
};

const getVehiculoById = async (req, res) => {
    const { id } = req.params;

    const data = await service.getVehiculoById(id);

    if (!data) return res.status(404).json({ msg: 'No encontrado' });

    res.json(data);
};

const createVehiculo = async (req, res) => {
    const data = await service.createVehiculo(req.body);
    res.status(201).json(data);
};

const deleteVehiculo = async (req, res) => {
    const { id } = req.params;
    await service.deleteVehiculo(id);
    res.json({ msg: 'Vehículo eliminado' });
};

module.exports = {
    getVehiculos,
    getVehiculoById,
    createVehiculo,
    deleteVehiculo
};