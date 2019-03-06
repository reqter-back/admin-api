var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/userController');
router.post("/token", ctrl.login);
router.post("/register", ctrl.register);
module.exports = router;