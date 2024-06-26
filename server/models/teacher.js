const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const teacherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type:String,
        required:true,
        unique:true,
    },
    password: {
        type:String,
        required:true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', 'male', 'female', 'other'],
        required: true
    },
    role: {
        type: mongoose.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    dateOfBirth: {
        type: String,
    },
    avatar: {
        type: String,
    },
    phoneNumber: {
        type: String,
        require: true
    },
    subject: {
        type: mongoose.Types.ObjectId,
        ref: 'Subject',
        required: true
    }
});

teacherSchema.pre('save', async function() {
    // chi hash cac password moi
    if (this.isModified()) {
        const salt = bcrypt.genSaltSync(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
})

teacherSchema.methods = {
    isCorrectPassword: async function (password) {
        return await bcrypt.compare(password, this.password);
    }
}

//Export the model
module.exports = mongoose.model('Teacher', teacherSchema);