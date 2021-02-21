// here we are using the sendgrid api to send emails to the various event attendees
const sgMail=require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
emails=['flarrowbat@gmail.com','201951022@iiitvadodara.ac.in']
nameList=['FlarrowBat','Amitvikram Dwivedi']
const sendInvitation=(emailList,nameList,title,)=>{
    emailList.forEach((email,index) => {
        sgMail.send({
            to:email,
            from:'dwivedia2001@gmail.com',
            subject:`${title}`,
            text: ` Hey ${nameList[index]} I invite you to the event. Let me know if you will be attending the event`
            })    
    });
    
}

sendInvitation(emails,nameList,'Digital Ocean')
// emails.forEach((email,index) => {
//     console.log(email)
//     console.log(nameList[index])
// });