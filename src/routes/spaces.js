var express = require('express');
var router = express.Router();
var auth = require('../controllers/auth');
var controller = require('../controllers/spaceController');

router.get("/stats", auth.verifyToken, controller.stats);

router.put("/setlocales", auth.verifyToken, controller.setlocales);

module.exports = router;