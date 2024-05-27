const router = require('express').Router()
const ctrls = require('../controllers/teacher')

router.post("/login", ctrls.login)
router.post("/register", ctrls.register)

module.exports = router