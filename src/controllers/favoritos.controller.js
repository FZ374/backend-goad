const service = require('../services/favoritos.service');

const getFavoritos = async (req, res) => {
    const data = await service.getFavoritos();
    res.json(data);
};

const getFavoritoById = async (req, res) => {
    const { id } = req.params;
    const favorito = await service.getFavoritoById(id);
    if (!favorito) return res.status(404).json({ msg: 'No encontrado' });
    res.json(favorito);
};

const createFavorito = async (req, res) => {
    const data = await service.createFavorito(req.body);
    res.status(201).json(data);
};

const updateFavorito = async (req, res) => {
    const { id } = req.params;
    const data = await service.updateFavorito(id, req.body);
    if (!data) return res.status(404).json({ msg: 'No encontrado' });
    res.json(data);
};

const deleteFavorito = async (req, res) => {
    const { id } = req.params;
    await service.deleteFavorito(id);
    res.json({ msg: 'Favorito eliminado' });
};

module.exports = {
    getFavoritos,
    getFavoritoById,
    createFavorito,
    updateFavorito,
    deleteFavorito
};