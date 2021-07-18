const mongoose = require('mongoose')

const Schema = mongoose.Schema;

let user = new Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,

    },
    flag: {
        type: Number,
        required: true,
        default: 0

    },
    mobileno: {
        type: Number,
        required: true,

    },
    password: {
        type: String,
        required: true
    },
    rollno: {
        type: Number,
        required: true,

    }
})

module.exports = mongoose.model('User', user)