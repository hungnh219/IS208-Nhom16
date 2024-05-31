const mongoose = require("mongoose")

const lessonSchema = new mongoose.Schema({
    class: {
        type: mongoose.Types.ObjectId, ref: 'Class',
    },
    teacher: {
        type: mongoose.Types.ObjectId, ref: 'Teacher',
    },
    lessonDay: {
        type: String,
        require: true,
    },
    orderNumber: {
        type: String,
        enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        require: true
    }
})

module.exports = mongoose.model('Lesson', lessonSchema)