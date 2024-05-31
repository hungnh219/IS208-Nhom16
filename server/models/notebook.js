const mongoose = require('mongoose')

const notebookSchema = new mongoose.Schema({
    class: {
        type: mongoose.Types.ObjectId, ref: 'Class'
    },
    subject: {
        type: mongoose.Types.ObjectId, ref: 'Subject'
    },
    teacher: {
        type: mongoose.Types.ObjectId, ref: 'Teacher'
    },
    day: {
        type: Number,
        require: true
    },
    lesson: {
        type: Number,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    comment: {
        type: String,
        require: true
    },
    absentStudents: [{
        type: mongoose.Types.ObjectId, ref: 'Student'
    }],
    week: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Notebook', notebookSchema)