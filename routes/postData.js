"use strict";
const express = require('express'),
    router = express.Router(),
    Guest = require('../models/guest');

router.post('/postData', (req, res, next) => {
    const guests = JSON.parse(req.body.data);

    Guest.insertMany(guests, (err,docs) => {
        if(err){
            console.log(err);
        }
    });

    res.json({ done: true });
});

module.exports = router;