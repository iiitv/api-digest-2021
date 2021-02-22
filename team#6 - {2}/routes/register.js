var express = require('express');
var router = express.Router();
var userData = require('../models/user')
var bcrypt = require('bcrypt')
var mongoose = require('mongoose')
const {ensureGuest} = require("../middleware/authMiddleware");
/* GET home page. */

router.get('/',ensureGuest, function(req, res, next) {
  res.render('register', {});
});

router.post('/',async (req,res)=>{
    const pass = req.body.psw;
    const rounds = 10;
    var hashedPassword = '';
    var ob1;
    // the password created is being hashed using bcrypt to maintain data privacy
    ob1 = await bcrypt.hash(pass, rounds, (err, hash) => {
      if (err) {
        console.log(err);
        return;
      }
      hashedPassword = hash;
    let userDetails = new userData({
        name: req.body.name,
        email: req.body.usremail,
        date: req.body.date,
        gender: req.body.gender,
        password: hashedPassword
    });
    userDetails.save()
    .then((doc)=>{
        console.log("user saved in database.");
        res.redirect("/");
    })
    .catch((err) => {
        console.log('error : ', err);
      });
});
})

module.exports = router;
