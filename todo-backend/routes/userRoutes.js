const express = require('express')
const router = express.Router()
const { fetchUsers, fetchUserRoles, createUser, editUser, deleteUser } = require('../controllers/users/users')
const { checkUserManagementPrivilege } = require('../privilegeCheck/users')

router.get('/roles', fetchUserRoles)
router.get('/list', fetchUsers)
router.post('/create', checkUserManagementPrivilege, createUser)
router.patch('/edit', checkUserManagementPrivilege, editUser)
router.delete('/delete', checkUserManagementPrivilege, deleteUser)

module.exports = router;