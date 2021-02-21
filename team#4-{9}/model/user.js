const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    events: [{
        Title: {
            type: String,
        },
        venue: {
            type: String,
        },
        description: {
            type: String,
        },
        date: {
            type: Date
        },
        emailMessage: {
            type: String,
        },
        textMessage: {
            type: String,
        },
        attendees: [
            {
                name: {
                    type: String,
                },
                email: {
                    type: String,
                    trim: true,
                    lowercase: true,
                },
                contact: {
                    type: Number
                }
            }
        ]
    }]

}, { timestamps: true })


userSchema.pre('save', async function (next) {

    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})
userSchema.statics.findUserAndVerifyCredentials = async (username, password) => {

    const user = await User.findOne({ username })
    if (!user)
        throw new Error('Wrong Username Or Password')

    const verifyPassword = await bcrypt.compare(password, user.password)

    if (!verifyPassword) {
        throw new Error("Wrong Password")
    }

    return user;
}

const User = new model('User', userSchema)


module.exports = User;

// res.sendFile('index.html', { root: path.join(__dirname, '/public/') })