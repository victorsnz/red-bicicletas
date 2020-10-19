const express = require('express');
const router = express.Router();
const passport = require('passport');

const authAPIController = require('../../controllers/API/authControllerAPI');

router.post('/authenticate', authAPIController.authenticate);
router.post("/forgotPassword", authAPIController.forgotPassword);
router.post('/facebook-token', passport.authenticate('facebook-token', authAPIController.authFacebookToken));

module.exports = router;