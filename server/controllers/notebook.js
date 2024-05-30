const Notebook = require('../models/notebook')
const Student = require('../models/student')
const Class = require('../models/class')
const Teacher = require('../models/teacher')
const Subject = require('../models/subject')

const notebookData = require('../../data/notebook.json')

const convertData = async (notebook) => {
    const cls = await Class.findOne({ name: notebook.class})
    const teacher = await Teacher.findOne({ email: notebook.teacherEmail })
    const subject = await Subject.findOne({ code: notebook.subjectId })
    const absentStudents = []

    if (!cls || !teacher || !subject) {
        throw new Error('check your data again!')
    }

    for (let i = 0; i < notebook.absentStudents.length; i++) {
        const student = await Student.findOne({ email: notebook.absentStudents[i]})

        if (!student) {
            throw new Error('check your data again!')
        }

        absentStudents.push(student._id)
    }


    await Notebook.create({
        class: cls._id,
        subject: subject._id,
        teacher: teacher._id,
        content: notebook.content,
        comment: notebook.comment,
        week: notebook.week,
        absentStudents: absentStudents
    })
}

const insert = async (req, res) => {
    const promises = []

    for(let notebook of notebookData) {
        promises.push(convertData(notebook))
    }

    await Promise.all(promises)

    return res.json({
        success: true,
        message: "insert notebook data successfully!"
    })
}

module.exports = {
    insert,
}