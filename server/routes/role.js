const router = require('express').Router()
const ctrls = require('../controllers/role')

router.post('/addRole', ctrls.addRole)

module.exports = router