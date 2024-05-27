const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    homeroomTeacher: {
        type: mongoose.Types.ObjectId, ref: 'Teacher',
        require: true,
        unique: true
    }
})

module.exports = mongoose.Model('Class', classSchema)