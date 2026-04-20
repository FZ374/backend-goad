const router = require('express').Router();
const controller = require('../controllers/inmueble.controller');

router.get('/', controller.getInmuebles);
router.get('/:id', controller.getInmuebleById);
router.post('/', controller.createInmueble);
router.put('/:id', controller.updateInmueble);
router.delete('/:id', controller.deleteInmueble);

module.exports = router;