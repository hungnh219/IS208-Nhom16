const router = require('express').Router()
const ctrls = require('../controllers/user')

router.post('/register', ctrls.register)
router.get('/getAll', ctrls.getAll)
router.delete('/deleteUserByEmail', ctrls.deleteUserByEmail)
router.get('/login', ctrls.login)

module.exports = router

