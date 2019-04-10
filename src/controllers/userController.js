var jwt = require('jsonwebtoken');
const config = require('../config');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const broker = require('./serviceBroker');

exports.login = [
    //Validate fields
 body('username', "UserName must not be empty").isEmail().withMessage('Invalid email'),
 body('password', "Password must not be empty").isLength({min : 8}).withMessage('Password length must be at least 8 charachters').isAlphanumeric().withMessage('Password must contain charachters and numbers'),
 //Sanitize fields
 sanitizeBody('username').trim().escape(),
 sanitizeBody('password').trim().escape(),
 (req, res, next) =>{
 console.log(req.body);
 var errors = validationResult(req);
     if (!errors.isEmpty())
     {  
         //There are errors. send error result
         res.status(400).json({"success" : false, "error" : errors.message});
         return;
     }
     else
     {
         //#region Rabbit Implementation
         broker.sendRPCMessage({body : req.body, headers : req.headers, method : "POST", query : {}}, 'admintoken').then((result)=>{
             var obj = JSON.parse(result.toString('utf8'));
             if (!obj.success)
             {
                 if (obj.error)
                     return res.status(404).json(obj);
                else
                    return res.status(401).json(obj);
             }
             else
             {
                 if (obj.data)
                 {
                    res.status(200).json({access_token : obj.data.access_token});
                 }
                 else
                 {
                     res.status(400).json({});
                 }
             }
         });
     }
}
];

exports.register = [
    // body('username', "Username must not be empty").isEmail().withMessage('Invalid email address.'),
    // body('password', "Password must not be empty").isLength({min : 8}).withMessage('Password length must be at least 8 charachters').isAlphanumeric().withMessage('Password must contain charachters and numbers'),
    // //Sanitize fields
    // sanitizeBody('email').trim().escape(),
    // sanitizeBody('password').trim().escape(),
    (req, res, next) =>{
        var errors = validationResult(req);
        if (!errors.isEmpty())
        {  
            //There are errors. send error result
            res.status(400).json({"success" : false, "error" : errors});
            return;
        }
        else
        {
            console.log('add system user started.')
            broker.sendRPCMessage(req.body, 'adminregister').then((result)=>{
                var obj = JSON.parse(result.toString('utf8'));
                if (!obj.success)
                {
                    if (obj.error)
                    {
                        return res.status(500).json(obj);
                    }
                }
                else
                {
                    res.status(201).json(obj.data);
                }
            });
        };
    }
];


exports.changeavatar = [
    (req, res, next) =>{
        var errors = validationResult(req);
        if (!errors.isEmpty())
        {  
            //There are errors. send error result
            res.status(400).json({"success" : false, "error" : errors});
            return;
        }
        else
        {
            console.log('add system user started.')
            broker.sendRPCMessage(req.body, 'adminchangeavatar').then((result)=>{
                var obj = JSON.parse(result.toString('utf8'));
                if (!obj.success)
                {
                    if (obj.error)
                    {
                        return res.status(500).json(obj);
                    }
                }
                else
                {
                    res.status(201).json(wrapUser(obj.data));
                }
            });
        };
    }
];


exports.updateprofile = [
    (req, res, next) =>{
        var errors = validationResult(req);
        if (!errors.isEmpty())
        {  
            //There are errors. send error result
            res.status(400).json({"success" : false, "error" : errors});
            return;
        }
        else
        {
            console.log('add system user started.')
            broker.sendRPCMessage(req.body, 'adminupdateprofile').then((result)=>{
                var obj = JSON.parse(result.toString('utf8'));
                if (!obj.success)
                {
                    if (obj.error)
                    {
                        return res.status(500).json(obj);
                    }
                }
                else
                {
                    res.status(201).json(wrapUser(obj.data));
                }
            });
        };
    }
];


exports.deleteAccount = [
    (req, res, next) =>{
        var errors = validationResult(req);
        if (!errors.isEmpty())
        {  
            //There are errors. send error result
            res.status(400).json({"success" : false, "error" : errors});
            return;
        }
        else
        {
            console.log('add system user started.')
            broker.sendRPCMessage(req.body, 'admindeleteaccount').then((result)=>{
                var obj = JSON.parse(result.toString('utf8'));
                if (!obj.success)
                {
                    if (obj.error)
                    {
                        return res.status(500).json(obj);
                    }
                }
                else
                {
                    res.status(201).json(wrapUser(obj.data));
                }
            });
        };
    }
];


exports.findbyemail = [
    // body('username', "Username must not be empty").isEmail().withMessage('Invalid email address.'),
    // body('password', "Password must not be empty").isLength({min : 8}).withMessage('Password length must be at least 8 charachters').isAlphanumeric().withMessage('Password must contain charachters and numbers'),
    // //Sanitize fields
    // sanitizeBody('email').trim().escape(),
    // sanitizeBody('password').trim().escape(),
    (req, res, next) =>{
        var errors = validationResult(req);
        if (!errors.isEmpty())
        {  
            //There are errors. send error result
            res.status(400).json({"success" : false, "error" : errors});
            return;
        }
        else
        {
            console.log('add system user started.')
            broker.sendRPCMessage(req.body, 'adminfindbyemail').then((result)=>{
                var obj = JSON.parse(result.toString('utf8'));
                if (!obj.success)
                {
                    if (obj.error)
                    {
                        return res.status(500).json(obj);
                    }
                }
                else
                {
                    res.status(201).json(wrapUser(obj.data));
                }
            });
        };
    }
];

