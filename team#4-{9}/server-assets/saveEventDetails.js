const express = require('express')
const User = require('../model/user.js')
const { google } = require("calendar-link");
const verifyToken = require('../security/verifytoken-middleware.js')
sendDetailsRouter=new express.Router()
const cookieParser = require('cookie-parser')
sendDetailsRouter.use(cookieParser())
sendDetailsRouter.post('/createEvent',verifyToken, async (req,res)=>{
        data = req.body
        const event = {
        title: data.event,
        description: data.eventDescription,
        start:data.eventDate,
        duration: [parseInt(data.eventDuration.split(' ')[0]), data.eventDuration.split(' ')[1]],
        allDay:true,
      };
      const link =google(event);
      console.log(link)
    let user = await User.findOne({"username": req.username})
    if (user!=null) {
        user.events.push({"Title": data.event, "venue": data.eventVenue, "description": data.eventDescription, "date": data.eventDate,"duration":data.eventDuration,"calendarLink":link})
        await user.save()
        event_ = user.events[user.events.length-1]
        res.redirect(`/addRecipents/${event_._id}`)
    }
    
})

module.exports=sendDetailsRouter