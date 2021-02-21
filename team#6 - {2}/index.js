const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
var logger = require('morgan');
var bodyParser = require('body-parser')
var path = require('path')
const cookieParser = require("cookie-parser")
const registerRouter = require('./routes/register')
const {checkUser} = require("./middleware/authMiddleware");
const landingRouter = require('./routes/landing')
const dashboardRouter  = require('./routes/dashboard')

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
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.get('*',checkUser);

app.use('/',landingRouter);
app.use('/register',registerRouter)
app.use('/dashboard',dashboardRouter)
app.use("/auth",require("./routes/auth"));



app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`);
})