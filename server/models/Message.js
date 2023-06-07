const mongoose = require('mongoose')
const { Schema, model } = mongoose

const MessageSchema = new Schema({
    text: String,
    sender: {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    room: String,
}, {timestamps: true})

const MessageModel = model('Message', MessageSchema)

module.exports = MessageModel