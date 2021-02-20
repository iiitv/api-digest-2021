const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("landing");
})

app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`);
})