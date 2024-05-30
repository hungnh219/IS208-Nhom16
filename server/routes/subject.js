const router = require('express').Router()
const ctrls = require('../controllers/subject')

router.post('/createSubject', ctrls.createSubject)

module.exports = router