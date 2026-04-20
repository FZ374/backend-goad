const router = require('express').Router();
const controller = require('../controllers/categoria.controller');

router.get('/', controller.getCategorias);
router.get('/:id', controller.getCategoriaById);
router.post('/', controller.createCategoria);
router.put('/:id', controller.updateCategoria);
router.delete('/:id', controller.deleteCategoria);

module.exports = router;