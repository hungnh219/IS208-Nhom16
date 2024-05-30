const Lesson = require('../models/lesson')
const Teacher = require('../models/teacher')
const Subject = require('../models/subject')
const Class = require('../models/class')

const lessonData = require('../../data/lesson.json')

const convertData = async (lesson) => {
    console.log(lesson)
    const cls = await Class.findOne({ name: lesson.class })
    // const teacher = await Teacher.findOne({ email: lesson.teacherEmail })
    const teacher = await Teacher.findOne({ email: lesson.teacherEmail })
    const subject = await Subject.findOne({ code: lesson.subjectId })

    if (!cls || !teacher || !subject ) {
        console.log('class', cls)
        console.log('teacher', teacher)
        console.log('subject', subject)
    }

    await Lesson.create({
        class: cls._id,
        subject: subject._id,
        teacher: teacher._id,
        lessonDay: lesson.day,
        orderNumber: lesson.orderNumber
    })
}

const insert = async (req, res) => {
    const promises = []

    for (let lesson of lessonData) {
        promises.push(convertData(lesson))
    }
    await Promise.all(promises)

    return res.json({
        success: true,
        message: "insert lesson data successfully!"
    })
}

module.exports = {
    insert,
}