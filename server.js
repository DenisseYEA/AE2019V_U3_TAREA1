const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const wagner = require('wagner-core');
const path = require('path');

let app = express();//Instanciar servidor

require('./models/models')(wagner);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});//Permisos que se daran a las aplicaciones

const urlBase = "/api/v1/";

const user = require('./routers/user.router')(wagner);
const brand = require('./routers/brand.router')(wagner);

app.use(urlBase+'usuarios',user);
app.use(urlBase+'brands',brand);

module.exports = app;