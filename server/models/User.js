const mongoose = require('mongoose')
const { Schema, model } = mongoose

const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: String,
    icon: String,
}, {timestamps: true})

const UserModel = model('User', UserSchema)

module.exports = UserModel