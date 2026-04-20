const router = require('express').Router();
const controller = require('../controllers/empleo.controller');

router.get('/', controller.getEmpleos);
router.get('/:id', controller.getEmpleoById);
router.post('/', controller.createEmpleo);
router.put('/:id', controller.updateEmpleo);
router.delete('/:id', controller.deleteEmpleo);

module.exports = router;