const service = require('../services/categoria.service');

const getCategorias = async (req, res) => {
    const data = await service.getCategorias();
    res.json(data);
};

const getCategoriaById = async (req, res) => {
    const { id } = req.params;
    const categoria = await service.getCategoriaById(id);
    if (!categoria) return res.status(404).json({ msg: 'No encontrado' });
    res.json(categoria);
};

const createCategoria = async (req, res) => {
    const data = await service.createCategoria(req.body);
    res.status(201).json(data);
};

const updateCategoria = async (req, res) => {
    const { id } = req.params;
    const data = await service.updateCategoria(id, req.body);
    if (!data) return res.status(404).json({ msg: 'No encontrado' });
    res.json(data);
};

const deleteCategoria = async (req, res) => {
    const { id } = req.params;
    await service.deleteCategoria(id);
    res.json({ msg: 'Categoria eliminada' });
};

module.exports = {
    getCategorias,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria
};