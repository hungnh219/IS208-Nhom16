const router = require('express').Router()
const ctrls = require('../controllers/lesson')

router.post('/insert', ctrls.insert)

module.exports = router