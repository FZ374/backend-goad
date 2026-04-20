const router = require('express').Router();
const controller = require('../controllers/pago.controller');

router.get('/', controller.getPagos);
router.get('/:id', controller.getPagoById);
router.post('/', controller.createPago);
router.put('/:id', controller.updatePago);
router.delete('/:id', controller.deletePago);

module.exports = router;