const express = require('express'); 
const cors = require('cors');
const twilio = require('twilio'); 

const accountSid = '___YOUR___ACCOUNT__SID';
const authToken = '___YOUR___AUTHENTICATION__TOKEN'; 
const client = new twilio(accountSid, authToken);

const app = express();

app.use(cors()); 

app.get('/', (req, res) => {
    res.send('Welcome to the Express Server')
})

app.get('/send-text', (req, res) => {
    res.send('Hello to the Twilio Server')
    const { recipient, textmessage } = req.query;

    client.messages.create({
        body: textmessage,
        to:"+91" +recipient,  
        from: "Twilio generated number" 
    }).then((message) => console.log(message.body));
})

app.listen(4000, () => console.log("Running on Port 4000"))