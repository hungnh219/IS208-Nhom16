const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', 'male', 'female', 'other'],
        required: true
    },
    class: {
        type: mongoose.Types.ObjectId, ref: 'Class',
        required: true
    }
});

module.exports = mongoose.model('Student', studentSchema);