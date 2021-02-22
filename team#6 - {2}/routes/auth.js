const express = require('express');
const router = express.Router();
const userData = require("../models/user");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {ensureGuest,ensureAuth} = require("../middleware/authMiddleware");

const MAXAGE = 3*60*60*24;

const getToken = (id)=>{
    return jwt.sign({id},"MySecretPassword",{
        expiresIn:MAXAGE
    })
}

router.get("/login",ensureGuest,(req,res)=>{
    res.render("login");
})

router.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    const data = await userData.find({email});
    if(data.length==0){
        res.render("login",{error:"Email Or Password Not Match"})
    }else{
       const isMatch = await bcrypt.compare(password,data[0].password);
       if(isMatch){
            const token = getToken(data[0]._id);
            res.cookie("jwt",token,{
                httpOnly:true,
                maxAge:MAXAGE*1000
            });
            res.redirect("/dashboard");
       }else{
        res.render("login",{error:"Email Or Password Not Match"});
       }
    }
})

router.get("/logout",ensureAuth,(req,res)=>{
    res.cookie("jwt","",{maxAge:1});
    res.redirect("/");
})

module.exports = router;