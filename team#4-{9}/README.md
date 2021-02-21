# Eventifier

-------------------------------------------

## Problem Statement:

 In today’s world, it is not easy to organize and manage an event. Organizing an event involves quite a few hectic steps, ranging from sending invites, managing registrations, communicating to the participants, and keeping a check on the RSVPs. Since the steps involved are widely distributed over different platforms, and due to this, managing the information becomes a restless task. So, we thought about creating a single platform, where an user can create events, invite all the participants via customizable and dynamic email and text messages, not only this, but this platform also helps the organizers by providing them with real time data to easily manage the RSVPs. The participants do not need to put any efforts while registering for the event, as they can do it hassle-free, with just a few clicks on this platform. Furthermore, we have also provided a Discussion Platform where all the participants can easily discuss the event, ask their queries, and interact with the organizers as well as their peer group, thus solving the problem of distributed communication. The Discussion platform has also been integrated with a Sentiment Analysis API, so that the user can be sure about the sentiments they channel through their messages.

## APIs Used:

- [SendGrid API](https://sendgrid.com/solutions/email-api/)
- [Sentim API](https://sentim-api.herokuapp.com/)
- [Google Sheets API](https://spreadsheets.google.com/feeds/cells/sheetId/sheetNumber/public/values?alt=json-in-script)
- [Google Calendar API](https://www.npmjs.com/package/calendar-link)
- [Twilio Messaging API](https://www.twilio.com/docs/api)

## [Live Preview](http://eventifier.shreyansh_mishr.repl.co/) 

## Requirements:

- NodeJS v12+ with NPM
- Git

-------------------------------------------

## Installation:

Clone and Install Packages
```bash
git clone https://www.github.com/Shreyansh-Mishra/api-digest-2021/
cd "api-digest-2021/team#4-{9}"
npm install
```

Create ``.env`` file

```env
PORT=your-preferred-port
DATABASE_URL=MongoDB-Connection-URL
JWT_SECRET=secret-jwt-key
SENDGRID_API_KEY=your-sendgrid-api-key
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
PHONE_NUMBER=your-twilio-phone-number
HOSTURL=url-where-the-app-is-hosted(example: http://eventifier.shreyansh_mishr.repl.co/)
```

-------------------------------------------

## Running:

```bash
node index.js
```

### To preview the app, visit ``http://localhost:3000/``
