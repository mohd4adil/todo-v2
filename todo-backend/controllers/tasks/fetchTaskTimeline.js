const taskModel = require('../../models/tasksModel')


exports.fetchTaskTimeline = async (req, res) => {
    const taskId = req.body?.taskId
    const sessionToken = req.cookies.auth_token
    try {
        const response = await taskModel.fetchTaskHistory(sessionToken, taskId)
        const chartData = response.map(history => {
            if (history.new_status === 'To Do' ) {
                return {
                    time: history.task_created,
                    count: 0
                }
            }
            else if (history.new_status === 'In Progress') {
                return {
                    time: history.updated_time,
                    count: 1
                }
            }
            else if (history.new_status === 'Completed') {
                return {
                    time: history.updated_time,
                    count: 2
                }
            }
        })
        console.log(chartData)
        return res.status(200).json({taskData: {
            taskId: taskId,
            chartData: chartData
        }})
    }
    catch (err) {
        console.log('ERROR: ', err)
        return res.status(500).json({message: 'Failed to retrieve task data'})
    }
}