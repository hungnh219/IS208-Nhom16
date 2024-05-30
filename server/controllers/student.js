const Student = require('../models/student')
const Class = require('../models/class')

const studentData = require('../../data/student.json')

const convertData = async (student) => {
    const cls = await Class.findOne({ name: student.class })

    await Student.create({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        dateOfBirth: student.dateOfBirth,
        gender: student.gender,
        class: cls._id
    })
}

const insert = async (req, res) => {
    const promises = []
    for (let student of studentData) {
        promises.push(convertData(student))
    }

    await Promise.all(promises)

    return res.json({
        success: true,
        message: "insert student data successfully!"
    })
}

module.exports = {
    insert,
}