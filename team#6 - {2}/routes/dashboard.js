var express = require('express');
var router = express.Router();
var articleData = require('../models/article')
const {ensureAuth} = require("../middleware/authMiddleware");
var request = require('request')
var currentArticleId = "";
//function to create id 
function getId(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  

//currently using get for testing purposes
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imhib3k2Mjc2OEBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6Ijg2NDkiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ZlcnNpb24iOiIyMDAiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xpbWl0IjoiOTk5OTk5OTk5IiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwIjoiUHJlbWl1bSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGFuZ3VhZ2UiOiJlbi1nYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjIwOTktMTItMzEiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXBzdGFydCI6IjIwMjEtMDItMjAiLCJpc3MiOiJodHRwczovL3NhbmRib3gtYXV0aHNlcnZpY2UucHJpYWlkLmNoIiwiYXVkIjoiaHR0cHM6Ly9oZWFsdGhzZXJ2aWNlLnByaWFpZC5jaCIsImV4cCI6MTYxMzg5NDM0MywibmJmIjoxNjEzODg3MTQzfQ.Bsi2O4WCUhMbXDaNAKryUUm8Fvz12_6Hlq2Wr7TXXBM';

router.get('/',ensureAuth, function(req, res, next) {
  res.render('dashboard', {});
});

router.get('/generate',ensureAuth, function(req, res, next) {
    res.render('generator', {});
});
//for testing purpose
currentArticleId = 'sdsdsd'
router.get("/product",async (req,resp)=>{
    //end point
    const url = 'https://fakestoreapi.com/products';
        await request(url, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        // console.log(body);
       resp.render('products',{productInfo: body, article_id: currentArticleId})
      });
})

router.post('/product',async (req,res)=>{
    // console.log(req.body);console.log(req.body);
    const filter = {id: req.body.id}
    const update = {products: req.body.productData}
    console.log(update)
    var updatedData = await articleData.findOneAndUpdate(filter, update, {
      new: true
    });
    console.log(updatedData);
})

router.post('/generate', function(req, res, next) {
    currentArticleId = getId(6);
    let articleDetails = new articleData({
        email: req.body.email,
        name: req.body.disease_name,
        data: req.body.value,
        id: currentArticleId,
    })
    articleDetails.save()
    .then((doc)=>{
        console.log("saved successfully",doc);
    }) 
    .catch((err)=>{
        console.error(error);
    })
    res.redirect('/product')
});

router.get("/diagnosis",(req,res)=>{
    const ed = '&format=json&language=en-gb'
    const url=`https://sandbox-healthservice.priaid.ch/symptoms?token=${token}${ed}`;
    request(url, { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        res.render("diagnosis",{data:body});
    });
})

//post request for doing diagnosis.
router.post("/diagnosis",(req,res)=>{
    res.redirect(`/dashboard/cure/${req.body.symptom}`);
})

//get request for showing possbile cure
router.get("/cure/:id",async(req,res)=>{
    
    const id = req.params.id;
    let ed = `&symptoms=[${id}]&format=json&language=en-gb`
    let url=`https://sandbox-healthservice.priaid.ch/symptoms?token=${token}${ed}`;
    let symptom = '';
    let t = await request(url, { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        console.log(body);
        symptom = body[0].Name;
        console.log(symptom)
    });
    const gender = res.locals.user.gender;
    const year = res.locals.user.date.getFullYear();
    ed = `&symptoms=[${id}]&gender=${gender}&year_of_birth=${year}&format=json&language=en-gb`;
    url=`https://sandbox-healthservice.priaid.ch/diagnosis?token=${token}${ed}`;
    request(url, { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        res.render("uploadData",{data:body});
    });
})

module.exports = router;