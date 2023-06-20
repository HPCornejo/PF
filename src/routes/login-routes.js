const express = require('express');
const loginController = require('../controllers/login-controller');

const router = express.Router();

router.get('/login', loginController.login);
router.post('/login', loginController.auth);
router.get('/registro', loginController.registro);
router.post('/registro', loginController.storeUser);
router.get('/logout', loginController.logout);

module.exports = router;