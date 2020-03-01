var express = require("express");
var router = express.Router();
var auth = require("../controllers/auth");
var controller = require("../controllers/spaceController");

router.get("/stats", auth.verifyToken, controller.stats);

router.put("/setlocales", auth.verifyToken, controller.setlocales);
router.put("/setroles", auth.verifyToken, controller.setroles);
router.put("/setwebhooks", auth.verifyToken, controller.setwebhooks);
router.get("/getwebhooks", auth.verifyToken, controller.getwebhooks);
router.get("/limits", auth.verifyToken, controller.limits);

module.exports = router;