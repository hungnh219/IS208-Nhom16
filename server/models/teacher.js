const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt')

var teacherSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default: 'user',
    },
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