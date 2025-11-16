const express = require('express')
const router = express.Router()
const authRouter = require('./authRoutes')
const todoRouter = require('./todoRoutes')
const dashboardRouter = require('./dashboardRoutes')
const userRouter = require('./userRoutes')

router.use('/auth', authRouter)
router.use('/task', todoRouter)
router.use('/dashboard', dashboardRouter)
router.use('/users', userRouter)

module.exports = router;