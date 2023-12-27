const express = require('express');
const router = express.Router();
const atuhController = require('../controllers/authController');

router.post('/', atuhController.handleLogin);

module.exports = router;