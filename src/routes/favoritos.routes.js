const router = require('express').Router();
const controller = require('../controllers/favoritos.controller');

router.get('/', controller.getFavoritos);
router.get('/:id', controller.getFavoritoById);
router.post('/', controller.createFavorito);
router.put('/:id', controller.updateFavorito);
router.delete('/:id', controller.deleteFavorito);

module.exports = router;