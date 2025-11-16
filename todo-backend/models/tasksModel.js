const db = require('./dbConnection')
const { fetchAccount } = require('../utils/decodeToken')

class taskModel {
    async createTask(sessionToken, taskName, taskDescription, taskStatus, taskCreatedTime) {   
        try {
            const account = await fetchAccount(sessionToken)
            const params = [taskName, taskDescription, taskStatus, sessionToken, account];
            const sql = `INSERT INTO tasks (user_email, task_name, task_description, status, is_deleted, account)
            SELECT user_email, $1, $2, $3, false, $5 FROM users WHERE session_token = $4
            RETURNING *
            `
            const response = await db.query(sql, params)
            if (response.rowCount > 0) {
                const taskId = response.rows[0]?.task_id
                const params = [taskId, taskCreatedTime, taskStatus]
                const sql = `INSERT INTO task_history (task_id, task_created, old_status, new_status, updated_time)
                VALUES ($1, $2, NULL, $3, $2)
                `
                await db.query(sql, params)
                return response.rows[0]
            }
            else {
                console.log('insert failed')
                throw new Error('Failed to insert')
            }
        }
        catch(err) {
            console.error('Insert error: ', err)
            throw err;
        }
    }

    async editTask(sessionToken, taskName, taskDescription, status, task_id, taskEditedTime) {
        const account = await fetchAccount(sessionToken)
        const currentTaskDataSql = `SELECT status FROM tasks where task_id = $1 and user_email IN (SELECT user_email FROM users where session_token = $2) AND account = $3`
        let currentStatus = null
        try {
            const currentTaskData = await db.query(currentTaskDataSql, [task_id, sessionToken, account])
            currentStatus = currentTaskData.rows[0]?.status
        }
        catch (err) {
            console.log('failed to fetch current task data: ', err)
            return false
        }

        try {
            const params = [taskName, taskDescription, status, sessionToken, task_id, account];
            const sql = `UPDATE tasks 
            SET task_name = $1, task_description = $2, status = $3
            WHERE task_id = $5 AND user_email IN (
                SELECT user_email 
                FROM users 
                WHERE session_token = $4
            ) AND account = $6`;
            const response = await db.query(sql, params)
            if (response.rowCount > 0) {
                if (currentStatus != status) {
                    try {
                        const params = [task_id, currentStatus, status, taskEditedTime]
                        const sql = `INSERT INTO task_history (task_id, task_created, old_status, new_status, updated_time)
                        SELECT $1, task_created, $2, $3, $4 from task_history where task_id = $1 and old_status IS NULL LIMIT 1
                        RETURNING *`
                        await db.query(sql, params)
                    }
                    catch(err) {
                        console.log('failed to update task_history: ', err)
                    }
                }

                return true
            }
            else {
                console.log('edit failed')
                throw new Error('Failed to edit')
            }
        }
        catch(err) {
            console.error('Insert error: ', err)
            throw err;
        }
    }

    async deleteTask(sessionToken, taskId) {
        try {
            const account = await fetchAccount(sessionToken)
            const sql = 'DELETE FROM tasks where task_id = $1 and user_email IN (SELECT user_email from users where session_token = $2) AND is_deleted = true AND account = $3'
            const params = [taskId, sessionToken, account]
            const response = await db.query(sql, params)
            if (response.rowCount > 0) {
                return true
            }
            return false
        }
        catch(err) {
            console.log('failed to delete task id: ', taskId)
            throw new Error('Failed to delete')
        }
    }

    async softDeleteTask(sessionToken, taskId) {
        try {
            const account = await fetchAccount(sessionToken)
            const sql = 'UPDATE tasks SET is_deleted=true where task_id= $1 AND user_email IN (SELECT user_email FROM users WHERE session_token = $2) AND account = $3'
            const params = [taskId, sessionToken, account]
            const response = await db.query(sql, params)
            if (response.rowCount > 0) {
                return true
            }
            return false
        }
        catch(err) {
            console.log('failed to delete task id: ', taskId)
            throw new Error('Failed to delete')
        }
    }

    async fetchTaskList(sessionToken) {
        try {
            const account = await fetchAccount(sessionToken)
            const sql = 'SELECT tasks.* FROM tasks INNER JOIN users ON tasks.user_email = users.user_email WHERE users.session_token = $1 AND tasks.account = $2 AND tasks.is_deleted = false ORDER BY task_id DESC'
            const params = [sessionToken, account]
            const response = await db.query(sql, params)
            if (response) {
                return response.rows
            }
        }
        catch(err) {
            console.log('error: ', err)
        }
    }
    async fetchTask(sessionToken, taskId) {
        try {
            const account = await fetchAccount(sessionToken)
            const sql = 'SELECT t.task_name, t.task_description, t.status FROM tasks t INNER JOIN users u on t.user_email = u.user_email where t.task_id = $1 and u.session_token = $2 and t.account = $3 and t.is_deleted=false '
            const params = [taskId, sessionToken, account]
            const response = await db.query(sql, params)
            if (response) {
                return response.rows[0]
            }
            }
            catch(err) {
                console.log('error: ', err)
            }
    }

    async fetchDeletedTasks(sessionToken) {
        try {
            const account = await fetchAccount(sessionToken)
            const sql = 'SELECT tasks.* FROM tasks INNER JOIN users ON tasks.user_email = users.user_email where users.session_token=$1 AND tasks.account = $2 AND tasks.is_deleted = true ORDER BY task_id ASC'
            const params = [sessionToken, account]
            const response = await db.query(sql, params)
            if (response) {
                return response.rows
            }
        }
        catch(err) {
            console.log('error: ', err)
        }
    }

    async restoreTask(sessionToken, taskId) {
        try {
            const account = await fetchAccount(sessionToken)
            const sql = 'UPDATE tasks SET is_deleted=false where task_id= $1 AND user_email IN (SELECT user_email FROM users WHERE session_token = $2) AND account = $3'
            const params = [taskId, sessionToken, account]
            const response = await db.query(sql, params)
            if (response) {
                return response.rows
            }
        }
        catch(err) {
                console.log('error: ', err)
        }
    }

    async emptyTrash(sessionToken) {
        try {
            const account = await fetchAccount(sessionToken)
            const sql = `DELETE FROM tasks WHERE is_deleted = 'true' AND user_email IN (SELECT user_email FROM users WHERE session_token = $1) AND account = $2`
            const params = [sessionToken, account]
            const response = await db.query(sql, params)
            if (response) {
                return response.rows
            }
        }
        catch(err) {
                console.log('error: ', err)
        }
    }

    async fetchTaskHistory(sessionToken, task_id) {
        try {
            const account = await fetchAccount(sessionToken)
            const sql = `SELECT th.task_created, th.old_status, th.new_status, th.updated_time FROM task_history th INNER JOIN tasks t ON th.task_id = t.task_id WHERE t.task_id = $1 AND t.user_email = (SELECT user_email FROM users WHERE session_token = $2) and t.account = $3`
            const params = [task_id, sessionToken, account]
            const response = await db.query(sql, params)
            if (response) {
                return response.rows
            }
        }
        catch(err) {
                console.log('error: ', err)
                throw new Error(err)
        }
    }
}

module.exports = new taskModel()