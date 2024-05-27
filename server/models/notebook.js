const mongoose = require('mongoose')

const notebookSchema = new mongoose.Schema({
    class: {
        type: mongoose.Types.ObjectId, ref: 'Class'
    },
    week: {
        type: String,
    },
    notebooks: [{
        type: mongoose.Types.ObjectId, ref: 'NotebookDetail'
    }]
})