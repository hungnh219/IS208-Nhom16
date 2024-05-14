const Teacher = require('../models/teacher')

const register = async (req, res) => {
    const { email, password, firstname, lastname } = req.body
    if (!email || !password || !firstname || !lastname) {
        return res.status(400).json({
            success: false,
            message: 'Missing inputs'
        })
    }
        
    const teacher = await Teacher.findOne({ email });
    if (teacher) {
        // throw new Error('teacher has existed!');
        console.log('teacher has existed!')
        return res.status(400).json({
            success: false,
            message: 'teacher has existed!',
        });
    }

    const newTeacher = await Teacher.create(req.body);
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
            message: users,
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

        console.log(`${response.firstname} login successfully`);
        return res.status(200).json({
            success: true,
            message: `${teacherData.firstname} login successfully`,
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

module.exports = {
    register,
    getAll,
    deleteTeacherByEmail,
    login,
}