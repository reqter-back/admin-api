var express = require('express');
var cors = require('cors')
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var compression = require('compression');

var app = express();

app.use(compression()); //Compress all routes
app.use(helmet());
app.use(cors());

var oauth = require('./routes/oauth');
var apps = require('./routes/apps');

app.use(logger('dev'));
app.use('/auth', oauth);
app.use('/apps', apps);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

module.exports = app;
