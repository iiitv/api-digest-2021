// here we are using the sendgrid api to send emails to the various event attendees
const sgMail=require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async (recipient,subject,body) => {
    await sgMail.send({
        to: recipient,
        from: 'dwivedia2001@gmail.com',
        subject,
        html: body
    })
}

module.exports = sendEmail