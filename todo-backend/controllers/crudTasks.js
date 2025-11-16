const taskModel = require('../models/tasksModel')

exports.creatingTask = async(req, res) => {
    try {
        const taskCreatedTime = new Date().toISOString()
        const response = await taskModel.createTask(req.cookies.auth_token, req.body.taskName, req.body.taskDescription, req.body.taskStatus, taskCreatedTime)
        if (response) {
             return res.status(201).json({
                message: 'Successfully added the task',
                task: response
        })
        }
    }
    catch(err) {
        console.log('Faced an error here: ', err)
        return res.status(500).json({message: 'Some internal issue, please try again later'})
    }
}

exports.editTask = async(req, res) => {
    try {
        const taskEditedTime = new Date().toISOString()
        const response = await taskModel.editTask(req.cookies.auth_token, req.body.taskName, req.body.taskDescription, req.body.status, req.body.taskId, taskEditedTime )
        if (response) {
            return res.status(201).json({message: 'Updated successfully',
                                         taskDetails : {
                                                        taskName: req.body.taskName, 
                                                        taskDescription: req.body.taskDescription, 
                                                        status: req.body.status, 
                                                        taskId: req.body.taskId
                                                        }   
                                                    })
        }

    }
    catch(err) {
        console.log('Error here', err)
        return res.status(500).json({message: 'Failed to edit task'})
    }
}

exports.softDelete = async(req, res) => {
    try {
        if (!req.query.taskId) return res.status(400).json({message: 'Request is invalid'})
        const response = await taskModel.softDeleteTask(req.cookies.auth_token, req.query.taskId)
        if (response) {
            return res.status(204).send()
            }
        else return res.status(500).send()
    }
    catch (err) {
        res.status(500).json({message: 'Failed to delete'})
    }
}

exports.deleteTask = async(req, res) => {
    try {
        if (!req.query.taskId ) return res.status(400).json({message: 'Query params is missing'})
        const response = await taskModel.deleteTask(req.cookies.auth_token, req.query.taskId)
        if (response) {
            return res.sendStatus(204)
        }
    }
    catch(err) {
        console.log('Error here', err)
        return res.status(500).json({message: 'Failed to edit task'})
    }
}

exports.restoreTask = async(req, res) => {
    try {
        if (!req.body.taskId ) return res.status(400).json({message: 'Request body is invalid'})
  
        const response = await taskModel.restoreTask(req.cookies.auth_token, req.body.taskId)
        if (response) {
            return res.sendStatus(200)
        }
    }
    catch(err) {
        console.log('Error here', err)
        return res.status(500).json({message: 'Failed to edit task'})
    }
}

exports.emptyTrash = async(req, res) => {
    try {
        const response = await taskModel.emptyTrash(req.cookies.auth_token)
        if (response) {
            return res.sendStatus(204)
        }
    }
    catch(err) {
        console.log('Error here', err)
        return res.status(500).json({message: 'Failed to edit task'})
    }
}