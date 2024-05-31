const router = require('express').Router()
const ctrls = require('../controllers/notification')

router.post('/create', ctrls.createPost)
router.post('/update', ctrls.updatePost)
router.post('/delete', ctrls.deletePost)
module.exports = router