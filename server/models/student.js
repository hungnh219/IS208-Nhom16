const { default: mongoose } = require("mongoose");
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Student', studentSchema);