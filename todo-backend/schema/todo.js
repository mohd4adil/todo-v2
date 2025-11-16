const z = require('zod')

const createTaskSchema = z.object({
    taskName: z.string().max(100, 'Task Name exceeds limit'),
    taskDescription: z.string().max(500, 'Task Description exceeds limit'),
    taskStatus: z.string().max(20, 'Task Status exceeds limit')
})

const editTaskSchema = z.object({
    taskId: z.number(),
    taskName: z.string().max(100, 'Task Name exceeds limit'),
    taskDescription: z.string().max(500, 'Task Description exceeds limit'),
    status: z.string().max(20, 'Task Status exceeds limit')
})

module.exports = { createTaskSchema, editTaskSchema }

