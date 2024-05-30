const router = require('express').Router()
const ctrls = require('../controllers/teacher')

router.get("/getAll", ctrls.getAll)
router.post("/login", ctrls.login)
router.post("/register", ctrls.register)
router.post("/insert", ctrls.insert)

module.exports = router