const express = require('express')
const User = require('../model/user.js')
const verifyToken = require('../security/verifytoken-middleware.js')
sendRecipentsRouter=new express.Router()
const cookieParser = require('cookie-parser')
sendRecipentsRouter.use(cookieParser())
sendRecipentsRouter.post('/addRecipents/:id',verifyToken, async (req,res)=>{
    data = req.body
    _id=req.prams.id
    let user = await User.findOne({"username": req.username})
    if (user!=null) {

        // user.events.push({"Title": data.event, "venue": data.eventVenue, "description": data.eventDescription, "date": data.eventDate})
        const index =user.events.findIndex(event=>event._id===_id);
        
        user.events[index].attendees.push({"name":data.name,"email":data.email,"contact":data.contact})

        await user.save()
        event_ = user.events[user.events.length-1]
        res.redirect(`/sendMessage/${event_._id}`)
    }
    
})

module.exports=sendRecipentsRouter