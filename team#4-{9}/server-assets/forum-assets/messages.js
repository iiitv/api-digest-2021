const generateTimeMessage=(username,text)=>{
    return {
        username,
        text,
        createdAt: new Date().getTime()
    }

}
const generateTimeLocation=(username,url)=>{
    return {
        username,
        url,
        createdAt: new Date().getTime()
    }

}
module.exports={
    generateTimeMessage,
    generateTimeLocation
}