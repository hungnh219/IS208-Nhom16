const Class = require('../models/class')
const Teacher = require('../models/teacher')

const classData = require('../../data/class.json')

const convertData = async (cls) => {
    const teacher = await Teacher.findOne({ email: cls.teacherEmail })

    if (!teacher) {
        throw new Error('Wrong teacher Id!');
    }

    await Class.create({
        name: cls.name,
        homeroomTeacher: teacher._id
    })
}

const insertData = async (req, res) => {
    const promises = []

    for (let cls of classData) {
        promises.push(convertData(cls))
    }

    await Promise.all(promises);

    return res.json({
        success: true,
        message: "insert class data successfully!"
    })
}

module.exports = {
    insertData
}