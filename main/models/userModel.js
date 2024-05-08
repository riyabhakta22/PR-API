const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: [true, 'Email Already Exists'],
        required: [true, 'Email Required'],
    },
    password: {
        type: String,
        required: [true, 'Password is Required']
    }
}, { timestamps: true })

module.exports = mongoose.model('users', userSchema)