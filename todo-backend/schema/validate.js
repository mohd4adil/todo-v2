const z = require('zod')
const todoSchema = require('./todo')
const authSchema = require('./auth')

function validatePreAuth(req, res, next) {
    try {
        console.log(req.body)
        const result = authSchema.authSchema.parse(req.body)
        console.log(result)
        return next()
    }
    catch (err) {
        if (err instanceof z.ZodError) {
            console.error('validation failed: ', err)
        }
        console.log('failed')
        res.status(400).json({message: 'Request body is invalid'})
    }
}

function validateCreateTask(req, res, next) {
    try {
        const result = todoSchema.createTaskSchema.parse(req.body)
        return next()
        
    }
    catch (err) {
        if (err instanceof z.ZodError) {
            console.error('validation failed: ', err)
        }
        res.status(400).json({message: 'Request body is invalid'})
    }
}

function validateEditTask(req, res, next) {
    try {
        const result = todoSchema.editTaskSchema.parse(req.body)
        return next()
        
    }
    catch (err) {
        if (err instanceof z.ZodError) {
            console.error('validation failed: ', err)
        }
        res.status(400).json({message: 'Request body is invalid'})
    }
}

module.exports = {
    validatePreAuth,
    validateCreateTask,
    validateEditTask
}