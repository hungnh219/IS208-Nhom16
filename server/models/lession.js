const mongoose = require("mongoose")

const lessonSchema = new mongoose.Schema({
    class: {
        type: mongoose.Types.ObjectId, ref: 'Class',
    },
    subject: {
        type: mongoose.Types.ObjectId, ref: 'Subject',
    },
    teacher: {
        type: mongoose.Types.ObjectId, ref: 'Teacher',
    },
    lessonDay: {
        type: String,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        require: true,
    },
    orderNumber: {
        type: String,
        enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        require: true
    }
})

module.exports = mongoose.Model('Lesson', lessonSchema)