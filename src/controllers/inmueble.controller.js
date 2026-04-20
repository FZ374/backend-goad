const service = require('../services/inmueble.service');

const getInmuebles = async (req, res) => {
    const data = await service.getInmuebles();
    res.json(data);
};

const getInmuebleById = async (req, res) => {
    const { id } = req.params;
    const inmueble = await service.getInmuebleById(id);
    if (!inmueble) return res.status(404).json({ msg: 'No encontrado' });
    res.json(inmueble);
};

const createInmueble = async (req, res) => {
    const data = await service.createInmueble(req.body);
    res.status(201).json(data);
};

const updateInmueble = async (req, res) => {
    const { id } = req.params;
    const data = await service.updateInmueble(id, req.body);
    if (!data) return res.status(404).json({ msg: 'No encontrado' });
    res.json(data);
};

const deleteInmueble = async (req, res) => {
    const { id } = req.params;
    await service.deleteInmueble(id);
    res.json({ msg: 'Inmueble eliminado' });
};

module.exports = {
    getInmuebles,
    getInmuebleById,
    createInmueble,
    updateInmueble,
    deleteInmueble
};