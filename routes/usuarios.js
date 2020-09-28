var express = require('express');
var router = express.Router();
var usuariosController = require('../controllers/usuario');

/* GET users listing. */
//router.get('/', usuariosController);
router.post('/create', usuariosController.create);
router.get('/create', usuariosController.create_get);
router.post('/:id/update', usuariosController.update);
router.get('/:id/update', usuariosController.update_get);
router.post('/:id/delete', usuariosController.delete);

module.exports = router;
