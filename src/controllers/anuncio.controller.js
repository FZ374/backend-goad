const service = require('../services/anuncio.service');

const getAnuncios = async (req, res) => {
    const data = await service.getAnuncios();
    res.json(data);
};

const getAnuncioById = async (req, res) => {
    const { id } = req.params;

    const anuncio = await service.getAnuncioById(id);

    if (!anuncio) return res.status(404).json({ msg: 'No encontrado' });

    await service.incrementarVistas(id);

    res.json(anuncio);
};

const createAnuncio = async (req, res) => {
    const data = await service.createAnuncio(req.body);
    res.json(data);
};

const updateAnuncio = async (req, res) => {
    const { id } = req.params;
    const data = await service.updateAnuncio(id, req.body);
    res.json(data);
};

const deleteAnuncio = async (req, res) => {
    const { id } = req.params;
    await service.deleteAnuncio(id);
    res.json({ msg: 'Anuncio eliminado' });
};

// 📸 Subir imagen
const uploadImagen = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.file) {
            return res.status(400).json({ msg: 'No se envió imagen' });
        }

        const imagen = await service.addImagen(id, req.file.filename);

        res.status(201).json(imagen);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 📸 Obtener imágenes de un anuncio
const getImagenes = async (req, res) => {
    const { id } = req.params;

    const imagenes = await service.getImagenesByAnuncio(id);

    res.json(imagenes);
};

module.exports = {
    getAnuncios,
    getAnuncioById,
    createAnuncio,
    updateAnuncio,
    deleteAnuncio,
    uploadImagen,
    getImagenes
};