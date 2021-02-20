const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
var logger = require('morgan');
var bodyParser = require('body-parser')
var path = require('path')

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get("/",(req,res)=>{
    res.render("landing",{});
})

app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`);
})