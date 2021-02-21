const express = require('express')
const User = require('../model/user.js')
const verifyToken = require('../security/verifytoken-middleware.js')
sendRecipentsRouter=new express.Router()
const cookieParser = require('cookie-parser')
sendRecipentsRouter.use(cookieParser())

const getSheetData = require('./spreadsheet.js')

sendRecipentsRouter.post('/addRecipients/:id',verifyToken, async (req,res)=>{
    data = req.body
    _id=req.params.id
    let user = await User.findOne({"username": req.username})
    if (user!=null) {

        // user.events.push({"Title": data.event, "venue": data.eventVenue, "description": data.eventDescription, "date": data.eventDate})
        event_ = "not found"
        index = 0
        finalindex=-1
        user.events.forEach(e => {
            if (e._id==_id) {
                finalindex=index
            }
            index++
        })
        //name email contact
        //sheetsurl names emails numbers
        if (!data.sheetsurl){
            if (!data.names || !data.emails || !data.numbers) {
                res.redirect(`/addRecipents/${_id}`)
            }
            else {
                names = data.names.split(', ')
                emails = data.emails.split(', ')
                numbers = data.numbers.split(', ')
                for (let i=0;i<names.length;i++) {
                    user.events[finalindex].attendees.push({"name" : names[i], "email": emails[i], "contact": numbers[i]})
                }
            }
        }
        else {
            sheetid = data.sheetsurl.split('/')[data.sheetsurl.split('/').findIndex(e=>e==="d")+1]
            console.log(sheetid)
            users = await getSheetData(sheetid);
            users.shift();
            users.forEach( e => {
                user.events[finalindex].attendees.push({"name" : e[0], "email": e[1], "contact": e[2]})
            })
        }
        await user.save()
        res.redirect(`/home`)
    }
    
})

module.exports=sendRecipentsRouter