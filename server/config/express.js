const express = require('express');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');

const authMiddleware = require('../middlewares/auth.js');
const storageMiddleware = require('../middlewares/storage.js'); 
const cors = require('../middlewares/cors.js');

module.exports = (app) => {
    app.engine('.hbs', hbs({ 
        extname: '.hbs'
    }));
    app.set('view engine', 'hbs');
    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: false})); 
    app.use(cookieParser());
    app.use(cors());  
    app.use(authMiddleware());   
    app.use(express.json());   
    app.use(storageMiddleware());     
};