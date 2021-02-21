const express = require('express');
const request = require('request');
const hbs =  require('hbs');
const bodyparser = require('body-parser');
const app =express();
const path = require('path');

const port = process.env.PORT || 3000;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname,'public')));

app.set('views',path.join(__dirname,'templates/views'));
app.set('view engine','hbs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', function(req,res){
    // res.render('index');
    res.render('homescreen')
});

app.use('/auth',require('./routes/auth'));

app.listen(port,()=>{
    console.log(`servewr is on port ${port}`);
});

module.exports = app;