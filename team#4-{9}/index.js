const express = require('express')
const path = require('path')
require('dotenv').config()
const generateAuthToken = require('./security/jwt.js')
const cookieParser = require('cookie-parser')
const verifytoken = require('./security/verifytoken-middleware')
const sendDetailsRouter=require('./server-assets/saveEventDetails')
const sendRecipentsRouter=require('./server-assets/recipients')
const bodyParser=require('body-parser')
require('./database/mongodb.js')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(sendRecipentsRouter)
app.use(express.json())
app.use(sendDetailsRouter)
// app.post('/eventDetails',(req,res)=>{

//     console.log(req.body)
//     res.send().status(200)
// })
const User = require('./model/user')
    // token
// /Users/Kaushalendra/mongodb/bin/mongod --dbpath=/Users/Kaushalendra/mongodb-data
app.use(express.static('public'))
app.use(cookieParser())
    // verifytoken== 
app.get('/', verifytoken, (req, res) => {
    if (req.username)
        return res.sendFile('home.html', { root: path.join(__dirname, '/webpages') })

    res.sendFile('login.html', { root: path.join(__dirname, '/webpages') })
})
app.get('/home', verifytoken, async(req, res) => {
    console.log(req.username + 'chutasd fhslakjfh ')

    if (!req.username)
        return res.redirect('/')

    res.sendFile('home.html', { root: path.join(__dirname, '/webpages') })
})
app.get('/createEvent', verifytoken, async(req, res) => {
    // console.log(req.username + 'chutasd fhslakjfh ')

    if (!req.username)
        return res.redirect('/')

    res.sendFile('createEvent.html', { root: path.join(__dirname, '/webpages') })
})

app.post('/login', async(req, res) => {
    try {
        const user = await User.findUserAndVerifyCredentials(req.body.username, req.body.password)
        console.log(user)
        const token = await generateAuthToken(user.username)
        console.log(token)
        res.cookie('authtoken', token, {
            httpOnly: true,
            maxAge: 86400*2*10000,
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


app.post('/register', async(req, res) => {
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

app.get('/logout',(req,res)=>{
 
    res.cookie('authtoken', '', {
        httpOnly: true,
        maxAge: 0
    })
    res.sendStatus(200)
})

app.get(['/*'], (req, res) => {
    res.sendFile('404page.html', { root: path.join(__dirname, '/webpages') })
})


app.listen(process.env.PORT, () => {
    console.log(`Server running on port 3000`)
})