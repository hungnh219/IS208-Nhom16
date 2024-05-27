const mongoose = require('mongoose')

const timeTableSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Types.ObjectId, ref: 'Teacher',
        require: true
    },
    lessons: [{
        type: mongoose.Types.ObjectId, ref: 'Lesson',
    }]
})

module.exports = mongoose.Model('TimeTable', timeTableSchema)