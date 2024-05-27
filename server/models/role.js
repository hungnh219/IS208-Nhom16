const mongoose = require('mongoose');

var roleSchema = new mongoose.Schema({
    code: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true,
        unique: true
    }
});

//Export the model
module.exports = mongoose.model('Role', roleSchema);