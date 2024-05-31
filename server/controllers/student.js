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

const getClassName = async (classId) => {
    try {
        const cls = await Class.findById(classId);
        if (cls) {
            return cls.name;
        } else {
            return null; // hoặc giá trị mặc định khác tùy bạn chọn
        }
    } catch (error) {
        console.error("Error while fetching subject:", error);
        return null; // hoặc xử lý lỗi theo cách khác tùy bạn chọn
    }
}

const getAll = async (req, res) => {
    const students = await Student.find().populate('class', 'name').lean();

    const formattedStudents = students.map(student => {
        return {
            ...student,
            class: student.class.name
        };
    });

    return res.status(200).json({
        success: true,
        message: "get student data successfully!",
        students: formattedStudents
    })
}

module.exports = {
    insert,
    getAll,
}