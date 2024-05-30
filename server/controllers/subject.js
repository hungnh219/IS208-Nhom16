const Subject = require('../models/subject')

const createSubject = async (req, res) => {
    const { code, name } = req.body

    const newSubject = await Subject.create({ code: code, name: name })

    return res.json({
        success: newSubject ? true : false,
        message: newSubject ? 'New subject has been added!' : 'Failed!!!'
    });
}

module.exports = {
    createSubject,
}