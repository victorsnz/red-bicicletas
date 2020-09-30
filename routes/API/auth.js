const express = require('express');
const router = express.Router();

const authAPIController = require('../../controllers/API/authControllerAPI');

router.post('/authenticate', authAPIController.authenticate);
router.post("/forgotPassword", authAPIController.forgotPassword);

module.exports = router;