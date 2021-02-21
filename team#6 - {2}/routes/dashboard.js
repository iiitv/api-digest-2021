var express = require('express');
var router = express.Router();
var articleData = require('../models/article')
const {ensureAuth} = require("../middleware/authMiddleware");
var request = require('request')
var CryptoJS  = require('crypto-js')
var currentArticleId = "";
var token = ''

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
// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imhib3k2Mjc2OEBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6Ijg2NDkiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ZlcnNpb24iOiIyMDAiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xpbWl0IjoiOTk5OTk5OTk5IiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwIjoiUHJlbWl1bSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGFuZ3VhZ2UiOiJlbi1nYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjIwOTktMTItMzEiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXBzdGFydCI6IjIwMjEtMDItMjAiLCJpc3MiOiJodHRwczovL3NhbmRib3gtYXV0aHNlcnZpY2UucHJpYWlkLmNoIiwiYXVkIjoiaHR0cHM6Ly9oZWFsdGhzZXJ2aWNlLnByaWFpZC5jaCIsImV4cCI6MTYxMzg5NDM0MywibmJmIjoxNjEzODg3MTQzfQ.Bsi2O4WCUhMbXDaNAKryUUm8Fvz12_6Hlq2Wr7TXXBM';
// const token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5sb2toYW5kZTU5MjNAZ21haWwuY29tIiwicm9sZSI6IlVzZXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI4NjQ4IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMjAwIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6Ijk5OTk5OTk5OSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IlByZW1pdW0iLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xhbmd1YWdlIjoiZW4tZ2IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMDk5LTEyLTMxIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwc3RhcnQiOiIyMDIxLTAyLTIwIiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWF1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE2MTM5MDIxMzQsIm5iZiI6MTYxMzg5NDkzNH0.sQkmoD7V6aPYN-l7GoCbrrl37a5Zxvs7SS57Cx1T2v0";

router.get('/',ensureAuth, async function(req, resp, next) {
    // var uri = 'https://sandbox-authservice.priaid.ch/login';
    // var secret_key = 'a4K5RpEi38NtQz76T';
    // var computedHash = CryptoJS.HmacMD5(uri,secret_key);
    // console.log(computedHash)
    // var computedHashString = computedHash.toString(CryptoJS.enc.Base64); 
    // const options = {
    //     headers: {
    //         'Authorization': 'Bearer ' + 'nlokhande5923@gmail.com' + ':' + computedHashString
    //     },
    //     json: true,
    //     method:"post"

    // }
    // await request(uri,options, (err, res, body) => {
    // if (err) { return console.log(err); }
    // console.log(res.body.Token)
    // token = res.body.token;
    resp.render('dashboard', {});
//   });
});

router.get('/generate',ensureAuth, function(req, res, next) {
    const ed = '&format=json&language=en-gb'
    const url=`https://sandbox-healthservice.priaid.ch/issues?token=${token}${ed}`;
    request(url, { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        res.render("generator",{data:body});
    });
});
//for testing purpose
currentArticleId = 'sdsdsd'
router.get("/product",async (req,resp)=>{
    //end point
    const url = 'https://nlok5923.github.io/RawData/productData.json';
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
        disease_id: req.body.disease_name,
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
        console.log(body)
        res.render("diagnosis",{data:body});
    });
})

//post request for doing diagnosis.
var symptoms = [];
router.post("/diagnosis",(req,res)=>{
    symptoms = req.body.symptoms;
    console.log(symptoms)
    res.redirect(`/dashboard/cure/${req.body.symptom}`);
})

//get request for showing possbile cure
// router.get("/cure",async(req,res)=>{
router.get("/cure/:id",(req,res)=>{
    const id = req.params.id;
    // let symptom_id = "";
    // symptoms.map((id)=>{
        // symptom_id = symptom_id + id + ","
    // })
    // symptom_id.slice(0,-1);
    // console.log(symptom_id)
    // symptom_id = symptom_id.substring(0, symptom_id.length - 1);
    // console.log(symptom_id)
    let ed = `&symptoms=[${id}]&format=json&language=en-gb`
    console.log(ed)
    let url=`https://sandbox-healthservice.priaid.ch/symptoms?token=${token}${ed}`;
    let symptom = '';
    const gender = res.locals.user.gender;
    const year = res.locals.user.date.getFullYear();
    request(url, { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        symptom = body[0].Name;
        console.log(req.body);
        ed = `&symptoms=[${id}]&gender=${gender}&year_of_birth=${year}&format=json&language=en-gb`;
        url=`https://sandbox-healthservice.priaid.ch/diagnosis?token=${token}${ed}`;
        request(url, { json: true }, (err1, response1, body1) => {
            if (err1) { return console.log(err1); }
            res.render("uploadData",{data:body1,symptom:symptom});
        });
    });
})

//article regarding disease
router.get("/article/:id",(req,res)=>{
    const id = req.params.id;
    let ed = `&issues=[${id}]&format=json&language=en-gb`
    let url=`https://sandbox-healthservice.priaid.ch/issues?token=${token}${ed}`;
    let issue = '';
    request(url, { json: true }, async(err, response, body) => {
        if (err) { return console.log(err); }
        issue = body[0].Name;
        var articles = await articleData.find({disease_id:id});
        articles.map((article)=>{
            article.data.replace(/["]+/g, "'")
        })
        console.log(articles)
        res.render("particularArticles",{issue,articles});
    });
})

module.exports = router;