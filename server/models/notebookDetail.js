const mongoose = require('mongoose')

const notebookDetailSchema = new mongoose.Schema({
    class: {
        type: mongoose.Types.ObjectId, ref: 'Class'
    },
    subject: {
        type: mongoose.Types.ObjectId, ref: 'Subject'
    },
    teacher: {
        type: mongoose.Types.ObjectId, ref: 'Teacher'
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
    }]
})

module.exports = mongoose.Model('NotebookDetail', notebookDetailSchema)