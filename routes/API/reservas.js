var express = require("express");
var router = express.Router();
var reservaAPIController = require("../../controllers/API/reservaControllerAPI");

router.get("/", reservaAPIController.reserva_list);
router.post("/update", reservaAPIController.actualizar_reserva);

module.exports = router;
