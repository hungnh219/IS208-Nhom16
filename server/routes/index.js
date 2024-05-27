const userRouter = require('./user')
const teacherRouter = require('./teacher')
const roleRouter = require('./role')

const initRoutes = (app) => {
    app.use('/api/user', userRouter),
    app.use('/api/teacher', teacherRouter),
    app.use('/api/role', roleRouter)
}

module.exports = initRoutes