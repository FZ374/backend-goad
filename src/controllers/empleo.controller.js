const service = require('../services/empleo.service');

const getEmpleos = async (req, res) => {
    const data = await service.getEmpleos();
    res.json(data);
};

const getEmpleoById = async (req, res) => {
    const { id } = req.params;
    const empleo = await service.getEmpleoById(id);
    if (!empleo) return res.status(404).json({ msg: 'No encontrado' });
    res.json(empleo);
};

const createEmpleo = async (req, res) => {
    const data = await service.createEmpleo(req.body);
    res.status(201).json(data);
};

const updateEmpleo = async (req, res) => {
    const { id } = req.params;
    const data = await service.updateEmpleo(id, req.body);
    if (!data) return res.status(404).json({ msg: 'No encontrado' });
    res.json(data);
};

const deleteEmpleo = async (req, res) => {
    const { id } = req.params;
    await service.deleteEmpleo(id);
    res.json({ msg: 'Empleo eliminado' });
};

module.exports = {
    getEmpleos,
    getEmpleoById,
    createEmpleo,
    updateEmpleo,
    deleteEmpleo
};