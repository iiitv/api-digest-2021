var express = require('express');
var router = express.Router();
var articleData = require('../models/article')
const {ensureAuth} = require("../middleware/authMiddleware");
//currently using get for testing purposes
router.get('/',ensureAuth, function(req, res, next) {
  res.render('dashboard', {});
});

router.get('/generate',ensureAuth, function(req, res, next) {
    res.render('generator', {});
});

router.post('/generate', function(req, res, next) {
    let articleDetails = new articleData({
        email: req.body.email,
        name: req.body.disease_name,
        data: req.body.value
    })
    articleDetails.save()
    .then((doc)=>{
        console.log("saved successfully",doc);
    }) 
    .catch((err)=>{
        console.error(error);
    })
});

module.exports = router;