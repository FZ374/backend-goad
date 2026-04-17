const router = require('express').Router();
const controller = require('../controllers/usuario.controller');

router.get('/', controller.getUsuarios);
router.post('/', controller.createUsuario);

module.exports = router;