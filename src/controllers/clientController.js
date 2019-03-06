var jwt = require('jsonwebtoken');
const config = require('../config');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const broker = require('./serviceBroker');

exports.getclients = function(req, res, next) {
    console.log(req.userId)
    broker.sendRPCMessage({userId : req.userId}, 'getuserapps').then((result)=>{
        var obj = JSON.parse(result.toString('utf8'));
        if (!obj.success)
        {
            if (obj.error)
                return res.status(500).json(obj);
            else
            {
                res.status(404).json(obj);
            }
        }
        else
        {
            res.status(200).json(obj.data);
        }
    });
  }

  exports.getbyid = function(req, res, next) {
    console.log(req.userId)
    broker.sendRPCMessage({appid : req.query.id}, 'getuserappbyid').then((result)=>{
        var obj = JSON.parse(result.toString('utf8'));
        if (!obj.success)
        {
            if (obj.error)
                return res.status(500).json(obj);
            else
            {
                res.status(404).json(obj);
            }
        }
        else
        {
            res.status(200).json(obj.data);
        }
    });
  }
exports.registerclient = function(req, res, next) {
    broker.sendRPCMessage(req.body, 'registerapp').then((result)=>{
    var obj = JSON.parse(result.toString('utf8'));
    if (!obj.success)
    {
        if (obj.error)
            return res.status(500).json(obj);
        else
        {
            res.status(404).json(obj);
        }
    }
    else
    {
        res.status(200).json(obj.data);
    }
});
}

exports.removeclient = function(req, res, next) {
    broker.sendRPCMessage(req.body, 'removeapp').then((result)=>{
        var obj = JSON.parse(result.toString('utf8'));
        if (!obj.success)
        {
            if (obj.error)
                return res.status(500).json(obj);
            else
            {
                res.status(404).json(obj);
            }
        }
        else
        {
            res.status(200).json(obj.data);
        }
    });
}

exports.updateclient = function(req, res, next) {
    broker.sendRPCMessage(req.body, 'updateapp').then((result)=>{
        var obj = JSON.parse(result.toString('utf8'));
        if (!obj.success)
        {
            if (obj.error)
                return res.status(500).json(obj);
            else
            {
                res.status(404).json(obj);
            }
        }
        else
        {
            res.status(200).json(obj.data);
        }
    });
}