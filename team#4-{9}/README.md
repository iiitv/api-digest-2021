# Eventifier

-------------------------------------------

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
