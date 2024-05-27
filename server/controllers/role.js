const Role = require('../models/role')

const addRole = async (req, res) => {
    const { code, name } = req.body;

    if (!code || !name) {
        return res.status(400).json({
            success: false,
            message: 'missing inputs', 
        });
    }

    const newRole = await Role.create({code: code, name: name})

    return res.json({
        success: newRole ? true : false,
        message: newRole ? 'create new role success' : 'create new role fail',
    });
}

module.exports = {
    addRole,
}