const express = require('express');
const router = express.Router();
const { fetchAllTasks, fetchTask, fetchDeletedTasks } = require('../controllers/getTodoList.js')
const { creatingTask, editTask, deleteTask, softDelete, restoreTask, emptyTrash } = require('../controllers/crudTasks.js')
const { validateCreateTask, validateEditTask } = require('../schema/validate.js')
const { checkCreateTask, checkEditTask, checkManageTask } = require('../privilegeCheck/tasks.js')
const { fetchTaskTimeline } = require('../controllers/tasks/fetchTaskTimeline.js')

router.get('/gettodolist', fetchAllTasks);
router.get('/deletedtasks', fetchDeletedTasks)
router.get('/tasks', fetchTask)
router.post('/taskhistory', fetchTaskTimeline)
router.post('/addtask', validateCreateTask, checkCreateTask, creatingTask)
router.patch('/edittask', validateEditTask, checkEditTask, editTask)
router.delete('/deletetask', checkManageTask, softDelete)
router.delete('/delete', checkManageTask, deleteTask)
router.put('/restore', checkManageTask, restoreTask)
router.delete('/emptytrash', checkManageTask, emptyTrash)



module.exports = router;
