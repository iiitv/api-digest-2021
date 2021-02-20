const express = require('express');
const router = express.Router();

router.get("/login",(req,res)=>{
    res.render("login");
})

router.post("/login",(req,res)=>{
    const {email,password} = req.body;
    
})

module.exports = router;