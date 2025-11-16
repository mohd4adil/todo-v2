const dashboardModel = require('../models/dashboardModel');
const taskModel = require('../models/tasksModel')

exports.fetchAllTasks = async(req, res) => {
    
    try {
        console.log('Attempting to fetch the tasks')
        const response = await taskModel.fetchTaskList(req.cookies.auth_token)
        // Simulate a 5-second delay
        setTimeout(() => {
            if (response && Array.isArray(response) && response.length === 0) {
                console.log('empty task list')
                return res.status(200).json({taskList: []})
            }
            return res.status(200).json({taskList: response})
        }, 2000);

    }
    catch(err) {
        console.log('error while fetching tasks from controller: ', err)
        return res.status(500).json({'Error': 'sInternal server error'});
    }
}

exports.fetchTask = async(req, res) => {
    try {
        console.log('Attempting to fetch task with task id: ', req.query.taskId)
        const response = await taskModel.fetchTask(req.cookies.auth_token,req.query.taskId)
        if (response) {
            console.log('FETCHEDDD!')
            return res.status(200).json({taskDetails: response})
        }
        // If the response is null or undefined (task not found), send a 404
        return res.status(404).json({ taskDetails: response });
    }
    catch(err) {
        console.error("Error in fetchTask:", err); // Log the actual error
        return res.status(500).json({ message: 'Internal Server Error' }); // Send a proper error response
    }
}

exports.fetchDeletedTasks = async(req, res) => {
    try {
        console.log('fetching trash')
        const response = await taskModel.fetchDeletedTasks(req.cookies.auth_token)
        if (response && Array.isArray(response) && response.length === 0) {
            return res.status(200).json({taskList: []})
        }
        return res.status(200).json({taskList: response})
    }
    catch(err) {
        console.log('failed to fetch deleted tasks')
        return res.status(500).json({message: 'Failed to fetch tasks'})
    }
}

exports.fetchStats = async(req, res) => {
    try {
        console.log('fetching task stats')
        const response = await dashboardModel.fetchTaskStats(req.cookies.auth_token)
        if (response && response.length > 0) {
            console.log({taskStats: response})
            return res.status(200).json({ taskStats: response})
        }
        else return res.sendStatus(200)
    }
    catch (err) {
        console.log('failed to fetch stats')
        return res.status(500).json({message: 'Failed to retrieve stats'})
    }
}