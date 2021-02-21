const express = require('express')
const path = require('path')
require('dotenv').config()
const generateAuthToken = require('./security/jwt.js')
const cookieParser = require('cookie-parser')
const verifytoken = require('./security/verifytoken-middleware')
const sendDetailsRouter = require('./server-assets/saveEventDetails')
const updateInviteRouter = require('./server-assets/updateInvite.js')

const sendRecipentsRouter = require('./server-assets/recipients')
const sendMessageRouter = require('./server-assets/writeMessage.js')
const bodyParser = require('body-parser')
require('./database/mongodb.js')
const app = express()
const http = require('http')
const server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server)

const { addUser,
    removeUser,
    getUser,
    getUsersInRoom } = require('./server-assets/forum-assets/users.js')
const { generateTimeMessage, generateTimeLocation } = require('./server-assets/forum-assets/messages.js')
const Filter = require('bad-words')

app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(sendMessageRouter)
app.use(sendRecipentsRouter)
app.use(updateInviteRouter)
app.use(express.json())
app.use(sendDetailsRouter)

const User = require('./model/user')
app.use(express.static('public'))
app.use(cookieParser())
app.get('/', verifytoken, (req, res) => {
    if (req.username)
        return res.sendFile('home.html', { root: path.join(__dirname, '/webpages') })

    res.sendFile('login.html', { root: path.join(__dirname, '/webpages') })
})
app.get('/home', verifytoken, async (req, res) => {


    if (!req.username)
        return res.redirect('/')

    res.sendFile('home.html', { root: path.join(__dirname, '/webpages') })
})
app.get('/createEvent', verifytoken, async (req, res) => {

    if (!req.username)
        return res.redirect('/')

    res.sendFile('createEvent.html', { root: path.join(__dirname, '/webpages') })
})

app.post('/login', async (req, res) => {
    try {
        const user = await User.findUserAndVerifyCredentials(req.body.username, req.body.password)
        
        const token = await generateAuthToken(user.username)
        
        res.cookie('authtoken', token, {
            httpOnly: true,
            maxAge: 86400 * 2 * 10000,
        })
        const obj = {
            ...user,
            token
        }
        res.status(200).send(JSON.stringify(obj))
        // res.redirect('/home')



    } catch (error) {
        const errorobj = {
            errormsg: error.message,
        }
        // console.log(errorobj.errormsg, 'safasd fjsf lkh;')
        res.status(400).send(JSON.stringify(errorobj))
    }
})


app.post('/register', async (req, res) => {
    console.log(req.body)

    const userobj = new User(req.body)

    try {
        const user = await userobj.save();
        console.log(user)

        const token = await generateAuthToken(user.username)
        console.log(token)
        res.cookie('authtoken', token, {
            httpOnly: true,
            maxAge: 86400,
        })
        res.send().status(200)
    } catch (error) {
        console.error(error);
    }
    // res.send(JSON.stringify(userobj)).status(200)
})

app.get('/logout', (req, res) => {

    res.cookie('authtoken', '', {
        httpOnly: true,
        maxAge: 0
    })
    res.sendStatus(200)
})

app.get('/addRecipents/:id', async (req, res) => {
    res.status(200).render(__dirname + "/webpages/recipients.ejs", { "id": req.params.id })
})

app.get('/writeMessage/:id', async (req, res) => {
    res.status(200).render(__dirname + "/webpages/writeMessage.ejs", { "id": req.params.id })
})
app.get('/invitation/:eventid/:inviteid', async (req, res) => {
    let event = null
    let users = await User.find({})
    users.forEach(e => {
        e.events.forEach(ele => {
            if (ele._id == req.params.eventid) {
                event = ele;
            }
        })//http://localhost:3000/invitation/603243d92aef9508a876e2df/603243e22aef9508a876e2e1
    })
    if (event != null) {
        res.status(200).render(__dirname + "/webpages/yesorno.ejs", { "id": req.params.inviteid, "event": event.Title, "event_id": event._id })
    }
})

app.get('/forum', (req, res) => {
    console.log(req.params.id)
    res.sendFile('ForumDiscuss.html', { root: path.join(__dirname, '/webpages') })
})


io.on('connection', (socket) => {
    console.log('New Websocket Connection')
    socket.on('join', async ({ username, room }, callback) => {
        const { user, error } = addUser({ id: socket.id, username, room })
        if (error) {
            return callback(error)
        }
        socket.join(user.room)
        socket.emit('message', generateTimeMessage('Admin', `Hey ${user.username} Welcome To The Room!`))
        socket.broadcast.to(user.room).emit('message', generateTimeMessage('Admin', `${user.username} has joned`))
    //    _id=user.room
       const _id=user.room
       let userObjForThisEvent = await User.findOne({"events._id": user.room})
       index = 0
       finalindex=-1
       userObjForThisEvent.events.forEach(e => {
           if (e._id==_id) {
               finalindex=index
           }
           index++
       })

    userObjForThisEvent.events[finalindex].forumChats.forEach((chat)=>{
    socket.emit('message', generateTimeMessage(chat.username, chat.message))
   })
    console.log(userObjForThisEvent.events[finalindex].Title)
        io.to(user.room).emit('roomData', {
            room: "Event Name: "+userObjForThisEvent.events[finalindex].Title,
            users: getUsersInRoom(user.room)
        })
        callback()
    })
    socket.on('sendMessage', async (message, callback) => {
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed')
        }
 
        const user = getUser(socket.id)
        const _id=user.room
        let userObjForThisEvent = await User.findOne({"events._id": user.room})
        console.log(userObjForThisEvent.username+' asdfsdfdsafasd')
        index = 0
        finalindex=-1
        userObjForThisEvent.events.forEach(e => {
            if (e._id==_id) {
                finalindex=index
            }
            index++
        })
        userObjForThisEvent.events[finalindex].forumChats.push({"username":user.username,"message":message})
        await userObjForThisEvent.save()
        io.to(user.room).emit('message', generateTimeMessage(user.username, message))
        callback('Delivered!!')
    })



    socket.on('sendLocation', ({ lat, long }, callback) => {
        const user = getUser(socket.id)

        io.to(user.room).emit('locationMessage', generateTimeLocation(user.username, `https://www.google.com/maps/?q=${lat},${long}`))
        callback()
    })
    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateTimeMessage('Admin', `${user.username} has left!`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })
    // socket.emit('countUpdated',count)

    // socket.on('increment',()=>{
    //     count++
    //     // socket.emit('countUpdated',count)
    //     io.emit('countUpdated',count)
    // })
})


app.get('/invitation/:eventid/:inviteid', async (req, res) => {
    let event = null
    let users = await User.find({})
    users.forEach(e=>{
        e.events.forEach(ele=>{
            if(ele._id==req.params.eventid){
                event = ele;
            }
        })//http://localhost:3000/invitation/603243d92aef9508a876e2df/603243e22aef9508a876e2e1
    })
    if(event!=null){
        res.status(200).render(__dirname+ "/webpages/yesorno.ejs", {"id": req.params.inviteid, "event": event.Title, "event_id": event._id})
    }
    
})

app.get('/events', async (req, res) => {
    events = []
    users = await User.find({})
    users.forEach(user => {
        events.push(...user.events)
    })
    res.status(200).render(__dirname+"/webpages/events.ejs",{events})
})

app.get('/info/:eventid', verifytoken, async (req, res) => {
    let event = null
    let users = await User.find({})
    users.forEach(e=>{
        e.events.forEach(ele=>{
            if(ele._id==req.params.eventid){
                event = ele;
            }
        })
    })
    if (event!=null) {
        let stats = []
        event.attendees.forEach(e=>{
            stats.push({
                name: e.name,
                email: e.email,
                phonenumber: e.contact,
                status: e.status
            })
        })
        res.status(200).render(__dirname+"/webpages/status.ejs", {stats})
    }
    else {
        res.redirect('/home')
    }
})


app.get(['/*'], (req, res) => {
    res.sendFile('404page.html', { root: path.join(__dirname, '/webpages') })
})


server.listen(process.env.PORT, () => {
    console.log(`Server running on port 3000`)
})