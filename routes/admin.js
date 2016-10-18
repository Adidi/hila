"use strict";
const express = require('express'),
    router = express.Router(),
    Guest = require('../models/guest');

const mwAdmin = (req,res,next) => req.session.admin ? next() : res.render('adminLogin');

router.route('/admin')
    .get(mwAdmin, (req, res, next) => {
        Guest.find({}).sort({createdAt: 'desc'}).exec((err,guests) => {
            res.render('admin',{guests});
        });
    }).post((req,res,next) => {
        if(req.body.username == 'hila' && req.body.password == 'guy'){
            req.session.admin = true;
        }
        res.redirect('/admin');
    }).delete(mwAdmin, (req,res,next) => {
        Guest.remove({_id: req.query.docid}, function (err) {
            if (err) {
                console.log(err);
            }
        });
        res.status(200).json({done:true});
    });

module.exports = router;