const router = require('express').Router();
const controller = require('../controllers/anuncio.controller');
const upload = require('../middlewares/upload.middleware');

// CRUD
router.get('/', controller.getAnuncios);
router.get('/:id', controller.getAnuncioById);
router.post('/', controller.createAnuncio);
router.put('/:id', controller.updateAnuncio);
router.delete('/:id', controller.deleteAnuncio);

// 📸 IMÁGENES
router.post('/:id/imagenes', upload.single('imagen'), controller.uploadImagen);
router.get('/:id/imagenes', controller.getImagenes);

module.exports = router;