require('dotenv').config()
const express = require('express')
const User = require('../model/user.js')
const sendMessage = require('./sendSms.js')
const verifyToken = require('../security/verifytoken-middleware.js')
sendMessageRouter = new express.Router()
const cookieParser = require('cookie-parser')
sendMessageRouter.use(cookieParser())
const sendEmail = require('./sendEmail.js')

sendMessageRouter.post('/writeMessage/:id', verifyToken, async (req, res) => {
    _id = req.params.id
    data = req.body;
    user = await User.findOne({ "username": req.username })
    if (user != null) {
        index = 0
        finalindex = -1
        user.events.forEach(e => {
            if (e._id == _id) {
                finalindex = index
            }
            index++
        })

        function escapeRegExp(string) {
            return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
        }

        function replaceAll(str, find, replace) {
            return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
        }

        function render_template(string, templates, values) {
            i = 0;
            templates.forEach(t => {
                string = replaceAll(string, t, values[i]);
                i++;
            })
            return string;
        }
        function generate_link(participant) {
            link = `${process.env.HOSTURL}invitation/${_id}/${participant._id}`
            return link
        }

        function formatLink(phone = false, link) {

            if (phone === false) {
                link = `<a href="${link}">link</a>`
            }
            return link
        }
        participants = user.events[finalindex].attendees
        event_ = user.events[finalindex]
        for (const p of participants) {
            templates = ['[name]', '[venue]', '[event]', '[link]', '[calendar]', '[description]', '[date]', '[duration]']
            values = [p.name, event_.venue, event_.Title, formatLink(false, generate_link(p)), event_.calendarLink, event_.description, event_.date, event_.duration]
            subject = render_template(data.emailSubject, templates, values)
            body = render_template(data.emailMessage, templates, values)
            body = body.split('\n').join("<br>")
            values[3] = formatLink(true, generate_link(p))
            phone_message = render_template(data.phoneMessage, templates, values)
            sendEmail(p.email, subject, body)
            sendMessage(p.contact, phone_message)
        }
        res.status(200).send(`Invitations Sent Succecfully!!
    <script>
    setTimeout(function () {
       // after 2 seconds
       window.location = "/home";
    }, 3000)
  </script>`)
    }
})

module.exports = sendMessageRouter;