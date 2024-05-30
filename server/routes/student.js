const router = require('express').Router()

const ctrls = require('../controllers/student')

router.post('/insert', ctrls.insert)

module.exports = router