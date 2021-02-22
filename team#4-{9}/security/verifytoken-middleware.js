const jwt = require('jsonwebtoken')


const verifytoken = (req, res, next) => {
    const token = req.cookies.authtoken || ''

    if (token === '') {
        return next()
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return next()
        }
        console.log(decoded.username + 'dsafasdf asdfsdaf')
        req.username = decoded.username;
        next()
    } catch (error) {
        console.log(error)
        return next()
    }



}


module.exports = verifytoken