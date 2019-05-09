var express = require('express');
var router = express.Router();
var auth = require('../controllers/auth');
var controller = require('../controllers/spaceController');
var controller = require('../controllers/assetController');
var controller = require('../controllers/contentTypeController');
var controller = require('../controllers/contentController');

router.get("/stats", auth.verifyToken, controller.stats);

router.get("/weekrep", auth.verifyToken, controller.weeklyrep);

router.get("/monthrep", auth.verifyToken, controller.monthlyrep);
router.put("/setlocales", auth.verifyToken, controller.setlocales);

module.exports = router;