var express = require('express');
var router = express.Router();
var articleData = require('../models/article')
const {ensureAuth} = require("../middleware/authMiddleware");
const request = require("request")
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

router.get("/diagnosis",(req,res)=>{
    const ed = '&format=json&language=en-gb'
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imhib3k2Mjc2OEBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6Ijg2NDkiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ZlcnNpb24iOiIyMDAiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xpbWl0IjoiOTk5OTk5OTk5IiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwIjoiUHJlbWl1bSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGFuZ3VhZ2UiOiJlbi1nYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjIwOTktMTItMzEiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXBzdGFydCI6IjIwMjEtMDItMjAiLCJpc3MiOiJodHRwczovL3NhbmRib3gtYXV0aHNlcnZpY2UucHJpYWlkLmNoIiwiYXVkIjoiaHR0cHM6Ly9oZWFsdGhzZXJ2aWNlLnByaWFpZC5jaCIsImV4cCI6MTYxMzg4NTE3OSwibmJmIjoxNjEzODc3OTc5fQ.HvrJPns_M64TAJ1lYxj-8vCWzszqJhtjZnJCUcFVL1Q'
    const url=`https://sandbox-healthservice.priaid.ch/symptoms?token=${token}${ed}`;
    request(url, { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        res.render("diagnosis",{data:body});
    });
})

module.exports = router;