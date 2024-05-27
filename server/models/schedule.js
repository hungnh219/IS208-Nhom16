const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    class: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    teacher: {
        type: String,  // Tham chiếu bằng email của giáo viên
        required: true
    },
    dayOfWeek: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;