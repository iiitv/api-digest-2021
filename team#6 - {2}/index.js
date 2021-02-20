const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://user:pass123@cluster0.alsmz.mongodb.net/myFirstDatabase",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("Connected With Database");
})
.catch(err=>{
    console.log("Error while connecting to database ",error);
})

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.render("landing");
})

app.get("/auth",require("./routes/auth"));

app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`);
})