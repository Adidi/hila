"use strict";

const path = require('path'),
    express = require('express'),
    favicon = require('serve-favicon'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    routeIndex = require('./routes');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public','favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//route for static files and index.html (default path is '/')
app.use(express.static(path.join(__dirname, 'public')));

app.use(routeIndex);

const port = process.env.PORT || 9001;
app.listen(port, () => {
    console.log('Server started http://localhost:' + port + '/');
});