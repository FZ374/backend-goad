const router = require('express').Router();
const controller = require('../controllers/vehiculo.controller');

router.get('/', controller.getVehiculos);
router.get('/:id', controller.getVehiculoById);
router.post('/', controller.createVehiculo);
router.delete('/:id', controller.deleteVehiculo);

module.exports = router;