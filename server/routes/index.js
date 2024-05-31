const userRouter = require('./user')
const teacherRouter = require('./teacher')
const roleRouter = require('./role')
const subjectRouter = require('./subject')
const classRouter = require('./class')
const lessonRouter = require('./lesson')
const studentRouter = require('./student')
const notebookRouter = require('./notebook')
const notificationRouter = require('./notification')
const initRoutes = (app) => {
    app.use('/api/user', userRouter),
    app.use('/api/teacher', teacherRouter),
    app.use('/api/role', roleRouter),
    app.use('/api/subject', subjectRouter)
    app.use('/api/class', classRouter),
    app.use('/api/lesson', lessonRouter),
    app.use('/api/student', studentRouter),
    app.use('/api/notebook', notebookRouter)
    app.use('/api/notebook', notificationRouter)
}

module.exports = initRoutes