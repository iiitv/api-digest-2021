// here we are using the Sms api to send sms to the various event attendees
require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
// phoneNumberList = [7046051694, 7984167023]


const sendMessage = async (number,text) => {
    number = '+91' + number
    console.log(number)
    console.log(text)
    client.messages
        .create({
            body: text,
            from: process.env.PHONE_NUMBER,
            to: number
        }).then(message => console.log(message.sid));
}



module.exports = sendMessage