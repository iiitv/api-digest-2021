const jwt = require('jsonwebtoken')


const generateAuthToken = (payload) => {

    const token = jwt.sign({
        username: payload
    },  process.env.JWT_SECRET, { expiresIn: '2days' });

    return token
}

module.exports = generateAuthToken