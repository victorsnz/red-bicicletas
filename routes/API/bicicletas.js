var express = require('express');
var router = express.Router();
var bicicletaAPIController = require('../../controllers/API/bicicletaControllerAPI');

router.get('/', bicicletaAPIController.bicicleta_list);
router.post('/create', bicicletaAPIController.bicicleta_create);
router.post('/update', bicicletaAPIController.bicicleta_update);
router.delete('/delete', bicicletaAPIController.bicicleta_delete);


module.exports = router;