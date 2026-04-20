const service = require('../services/pago.service');

const getPagos = async (req, res) => {
    const data = await service.getPagos();
    res.json(data);
};

const getPagoById = async (req, res) => {
    const { id } = req.params;
    const pago = await service.getPagoById(id);
    if (!pago) return res.status(404).json({ msg: 'No encontrado' });
    res.json(pago);
};

const createPago = async (req, res) => {
    const data = await service.createPago(req.body);
    res.status(201).json(data);
};

const updatePago = async (req, res) => {
    const { id } = req.params;
    const data = await service.updatePago(id, req.body);
    if (!data) return res.status(404).json({ msg: 'No encontrado' });
    res.json(data);
};

const deletePago = async (req, res) => {
    const { id } = req.params;
    await service.deletePago(id);
    res.json({ msg: 'Pago eliminado' });
};

module.exports = {
    getPagos,
    getPagoById,
    createPago,
    updatePago,
    deletePago
};