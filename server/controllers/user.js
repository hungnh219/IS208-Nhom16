const User = require('../models/user')

const register = async (req, res) => {
    const { email, password, firstname, lastname } = req.body
    if (!email || !password || !firstname || !lastname) {
        return res.status(400).json({
            success: false,
            message: 'Missing inputs'
        })
    }
        
    const user = await User.findOne({ email });
    if (user) {
        // throw new Error('User has existed!');
        console.log('User has existed!')
        return res.status(400).json({
            success: false,
            message: 'User has existed!',
        });
    }

    const newUser = await User.create(req.body);
    return res.status(200).json({
        success: newUser ? true : false,
        message: newUser ? 'Register successfully!' : 'Something went wrong!'
    })
}

const getAll = async (req, res) => {
    try {
        const users = await User.find();
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

const deleteUserByEmail = async (req, res) => {
    const { userEmail } = req.body;

    try {
        const user = await User.findOne({email: userEmail});

        if (!user) {
            res.status(404).json({
                success: false,
                message: "invalid email",
            })
        }

        const userName = user.firstname;
        const deletedUser = await User.deleteOne(user);

        res.status(200).json({
            success: deletedUser ? true : false,
            message: `${userName} has been deleted`,
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

    const response = await User.findOne({email: email})
    
    if (response && response.isCorrectPassword(email)) {
        // khong tra password va role ve client
        const { password, role, ...userData } = response.toObject();

        console.log(`${response.firstname} login successfully`);
        return res.status(200).json({
            success: true,
            message: `${userData.firstname} login successfully`,
            userData
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
    deleteUserByEmail,
    login,
}