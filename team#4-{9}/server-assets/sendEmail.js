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
            text: `Welcom to the app, ${nameList[index]}. Let me know how are you getting along with the app`
            })    
    });
    
}

sendInvitation(emails,nameList,'Digital Ocean')
// emails.forEach((email,index) => {
//     console.log(email)
//     console.log(nameList[index])
// });