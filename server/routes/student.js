const router = require('express').Router()

const ctrls = require('../controllers/student')

router.post('/insert', ctrls.insert)
router.get('/getAll', ctrls.getAll)

module.exports = router