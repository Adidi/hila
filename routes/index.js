"use strict";
const express = require('express'),
    router = express.Router();

router.get('/:locale([a-z]{2})?', (req, res, next) => {
    let locale = req.params.locale,
        clsDir;
    locale = locale && locale.toLowerCase();

    if(locale === 'en'){
        locale = require('../locale/en.json');
        clsDir = 'ltr';
    }
    else{
        locale = require('../locale/he.json');
        clsDir = 'rtl'
    }

    res.render('index', {locale,clsDir});
});

module.exports = router;