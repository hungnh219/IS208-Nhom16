const router = require('express').Router()

const ctrls = require('../controllers/notebook')

router.post('/insert', ctrls.insert)

module.exports = router