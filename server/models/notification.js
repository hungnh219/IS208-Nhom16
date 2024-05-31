const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type:String
    }
})

module.exports = mongoose.model('Notification', notificationSchema)