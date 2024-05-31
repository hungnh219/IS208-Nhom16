const router = require('express').Router()
const ctrls = require('../controllers/lesson')

router.post('/insert', ctrls.insert)
router.get('/getAll', ctrls.getAll)
router.get('/getByTeacherId', ctrls.getByTeacherId)

module.exports = router