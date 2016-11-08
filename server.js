"use strict";
const path = require('path'),
    express = require('express'),
    favicon = require('serve-favicon'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    FileStore = require('session-file-store')(session),
    routeIndex = require('./routes'),
    routerPostData = require('./routes/postData'),
    routerAdmin = require('./routes/admin');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/hila');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//set local moment to use of pug
app.locals.moment = require('moment-timezone');
app.locals.isDev = process.env.NODE_ENV !== 'production';

app.use(favicon(path.join(__dirname, 'public','favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//route for static files and index.html (default path is '/')
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    store: new FileStore,
    secret: 'hila.se',
    name: 'hs',
    resave: true,
    saveUninitialized: false
}));

app.use(routeIndex);
app.use(routerPostData);
app.use(routerAdmin);

const port = process.env.PORT || 9001;
app.listen(port, () => {
    console.log('Server started http://localhost:' + port + '/');
});