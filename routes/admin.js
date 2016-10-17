"use strict";
const express = require('express'),
    router = express.Router(),
    Guest = require('../models/guest');

router.route('/admin')
    .get((req, res, next) => {
        if(req.session.admin){
            Guest.find({}).sort({createdAt: 'desc'}).exec((err,guests) => {
                res.render('admin',{guests});
            });
        }
        else{
            res.render('adminLogin');
        }
    }).post((req,res,next) => {
        if(req.body.username == 'hila' && req.body.password == 'guy'){
            req.session.admin = true;
        }
        res.redirect('/admin');
    }).delete( (req,res,next) => {
        if(req.session.admin) {
            Guest.remove({_id: req.query.docid}, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }

        res.status(200).json({done:true});
    });

module.exports = router;