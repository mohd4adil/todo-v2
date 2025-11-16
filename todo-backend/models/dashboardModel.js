const db = require('./dbConnection')
const { fetchAccount } = require('../utils/decodeToken')

class DashboardModel {

    async fetchTaskStats(sessionToken) {

    try {
        const account = await fetchAccount(sessionToken)
        const sql = `WITH taskCount AS (
        SELECT COUNT(task_id) AS total FROM tasks WHERE user_email IN (
        SELECT user_email from users where session_token = $1
        ) AND account = $2)
        SELECT status, COUNT(status), (
            SELECT total from taskCount
        )
        FROM tasks WHERE user_email IN (
        SELECT user_email FROM users WHERE session_token = $1
        ) AND account = $2
        GROUP BY status
        `
        const params = [sessionToken, account]
        const response = await db.query(sql, params)
        if (response.rows.length > 0 ) {
            return response.rows
        }
    }
    catch (err) {
        console.log('Failed to fetch stats, error: ', err)
        throw new Error(err)
    }
    }

}

module.exports = new DashboardModel()