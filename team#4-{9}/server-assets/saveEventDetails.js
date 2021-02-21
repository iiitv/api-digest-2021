const express=require('express')

sendDetailsRouter=new express.Router()

sendDetailsRouter.post('/createEvent',(req,res)=>{
    console.log('fasdfsadfsdfsdf')
    console.log(req.body)
    res.redirect('/addRecipents/')



})

module.exports=sendDetailsRouter