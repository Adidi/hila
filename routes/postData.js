"use strict";
const express = require('express'),
    router = express.Router();

router.post('/postData', (req, res, next) => {
    console.log(JSON.parse(req.body.data));
    res.json({ done: true });
});

module.exports = router;