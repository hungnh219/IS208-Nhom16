const router = require('express').Router()
const ctrls = require('../controllers/class')

router.post('/insert', ctrls.insertData)

module.exports = router