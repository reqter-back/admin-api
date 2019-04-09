var express = require('express');
var cors = require('cors')
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var compression = require('compression');
var router = express.Router()


var app = express();

app.use(compression()); //Compress all routes
app.use(helmet());
app.use(cors());

var oauth = require('./routes/oauth');
var apps = require('./routes/apps');
var ctypes = require('./routes/contentTypes');
var assets = require('./routes/assets');
var contents = require('./routes/contents');
var categories = require('./routes/categories');

// a middleware function with no mount path. This code is executed for every request to the router
router.use("/auth", oauth);
router.use("/apps", apps);
router.use("/ctypes", ctypes);
router.use("/assets", assets);
router.use("/contents", contents);
router.use("/categories", categories);
app.use(logger('dev'));
app.use('/admin', router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

module.exports = app;
