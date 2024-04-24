const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;


const dbConnect = () => {
    mongoose.connect(mongoString);
    const database = mongoose.connection;

    database.on('error', (error) => {
        console.log(error)
    })

    database.once('connected', () => {
        console.log('database connected');
    })
}

module.exports = dbConnect;