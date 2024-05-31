const Lesson = require('../models/lesson')
const Teacher = require('../models/teacher')
const Class = require('../models/class')

const lessonData = require('../../data/lesson.json')

const convertData = async (lesson) => {
    console.log(lesson)
    const cls = await Class.findOne({ name: lesson.class })
    // const teacher = await Teacher.findOne({ email: lesson.teacherEmail })
    const teacher = await Teacher.findOne({ email: lesson.teacherEmail })

    if (!cls || !teacher) {
        console.log('class', cls)
        console.log('teacher', teacher)
        throw new Error('check data again!')
    }

    await Lesson.create({
        class: cls._id,
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

const getAll = async (req, res) => {
    const lessons = await Lesson.find()

    return res.status(200).json({
        success: lessons ? true : false,
        message: lessons ? lessons : "failed!!!"
    })
}

const getByTeacherId = async (req, res) => {
    const { teacherId } = req.query

    if (!teacherId) {
        throw new Error('missing input!')
    }

    console.log(req.body)

    const lessons = await Lesson.find({ teacher: teacherId }).populate('class', 'name');

    const modifiedLessons = lessons.map(lesson => {
        return {
            class: lesson.class.name, // Chỉ lấy tên của class
            lessonDay: lesson.lessonDay,
            orderNumber: lesson.orderNumber
        };
    });

    return res.status(200).json({
        success: lessons ? true : false,
        message: lessons ? modifiedLessons : "failed!!!"
    })
}

module.exports = {
    insert,
    getAll,
    getByTeacherId,
}