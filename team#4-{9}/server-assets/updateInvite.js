const express = require('express')
const User = require('../model/user.js')
updateInviteRouter=new express.Router()

updateInviteRouter.post('/updateinvite/:eventid/:id', async (req, res) => {
    data = req.body;
    if (!data.status) {
        res.status(200).send("Invalid choice!")
    }
    else {
        let event = null
        let users = await User.find({})
        user = null
        users.forEach(e=>{
            e.events.forEach(ele=>{
                if(ele._id==req.params.eventid){
                    event = ele;
                    user = e;
                }
            })//http://localhost:3000/invitation/603243d92aef9508a876e2df/603243e22aef9508a876e2e1
        })
        eventindex = user.events.findIndex(e=>e==event);
        recipientindex = user.events[eventindex].attendees.findIndex(e=>e._id==req.params.id)
        console.log(user)
        console.log(eventindex,recipientindex);
        user.events[eventindex].attendees[recipientindex].status=data.status
        await user.save()
        res.status(200).redirect('/home')
    }
})

module.exports = updateInviteRouter