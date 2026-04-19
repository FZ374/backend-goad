const router = require('express').Router();
const controller = require('../controllers/usuario.controller');

router.get('/', controller.getUsuarios);
router.post('/', controller.createUsuario);
router.get('/:id_usuario', controller.buscarUsuarioById);

module.exports = router;