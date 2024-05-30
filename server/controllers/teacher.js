const Teacher = require('../models/teacher')
const Role = require('../models/role')
const Subject = require('../models/subject')
const teacherData = require('../../data/teacher.json')

const convertData = async (teacher) => {
    const role = await Role.findOne({ code: teacher.roleId })
    const subject = await Subject.findOne({ code: teacher.subjectId })

    if (!role || !subject ) {
        throw new Error(`Check your id again!!!`)
    }

    await Teacher.create({
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        password: teacher.password,
        email: teacher.email,
        phoneNumber: teacher.phoneNumber,
        gender: teacher.gender,
        role: role._id,
        subject: subject._id,
        avatar: teacher.avatar,
        dateOfBirth: teacher.dateOfBirth
    })
}

const register = async (req, res) => {
    var newTeacher
    const { email, password, firstName, lastName, gender, phoneNumber, roleId, subjectId, avatar, dateOfBirth } = req.body

    if (!email || !password || !firstName || !lastName || !gender || !phoneNumber || !roleId || !subjectId || !avatar || !dateOfBirth ) {
        return res.status(400).json({
            success: false,
            message: 'Missing inputs'
        })
    }
    
    try {
        const role = await Role.findOne({ code: roleId })
        const subject = await Subject.findOne({ code: subjectId })

        if (!role || !subject ) {
            throw new Error(`Check your id again!!!`)
        }

        newTeacher = await Teacher.create({
            firstName: firstName,
            lastName: lastName,
            password: password,
            email: email,
            phoneNumber: phoneNumber,
            gender: gender,
            role: role._id,
            subject: subject._id,
            avatar: avatar,
            dateOfBirth: dateOfBirth
        })
    } catch (error) {
        console.error('Error creating teacher: ', error)
    }

    // const teacher = await Teacher.findOne({ email });
    // if (teacher) {
    //     // throw new Error('teacher has existed!');
    //     console.log('teacher has existed!')
    //     return res.status(400).json({
    //         success: false,
    //         message: 'teacher has existed!',
    //     });
    // }

    // const newTeacher = await Teacher.create(req.body);
    return res.status(200).json({
        success: newTeacher ? true : false,
        message: newTeacher ? 'Register successfully!' : 'Something went wrong!'
    })
}

const getAll = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json({
            success: true,
            message: teachers,
        })
    } catch {
        res.status(400).json({
            success: false,
            message: "api fail",
        })
    }
}

const deleteTeacherByEmail = async (req, res) => {
    const { teacherEmail } = req.body;

    try {
        const teacher = await Teacher.findOne({email: teacherEmail});

        if (!teacher) {
            res.status(404).json({
                success: false,
                message: "invalid email",
            })
        }

        const TeacherName = Teacher.firstname;
        const deletedTeacher = await Teacher.deleteOne(teacher);

        res.status(200).json({
            success: deletedTeacher ? true : false,
            message: `${teacherName} has been deleted`,
        })
    } catch {
        res.status(400).json({
            success: false,
            message: "api fail",
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Missing inputs'
        })
    }

    const response = await Teacher.findOne({email: email})
    
    if (response && response.isCorrectPassword(email)) {
        // khong tra password va role ve client
        const { password, role, ...teacherData } = response.toObject();

        console.log(`${response.firstName} login successfully`);
        return res.status(200).json({
            success: true,
            message: `${teacherData.firstName} login successfully`,
            teacherData
        })
    } else {
        console.log('Login failed');
        return res.status(400).json({
            success: false,
            message: 'Login failed'
        })
    }
}

const insert = async (req, res) => {
    const promises = []
    for (let teacher of teacherData) {
        promises.push(convertData(teacher))
    }
    await Promise.all(promises)

    return res.json({
        success: true,
        message: "insert teacher data successfully!"
    })
}

module.exports = {
    register,
    getAll,
    deleteTeacherByEmail,
    login,
    insert
}