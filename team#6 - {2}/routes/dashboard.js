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

module.exports = router;