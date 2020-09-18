var express = require("express");
var router = express.Router();
var usuarioAPIController = require("../../controllers/API/usuarioControllerAPI");

router.get("/", usuarioAPIController.usuario_list);
router.post("/create", usuarioAPIController.usuario_create);
router.post("/reservar", usuarioAPIController.usuario_reservar);
router.post("/update", usuarioAPIController.usuario_actualizar);

module.exports = router;
