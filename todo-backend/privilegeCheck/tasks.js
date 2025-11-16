const { decodeToken } = require('../utils/decodeToken')
const { taskCreationPrivilege, taskEditorPrivilege, taskManagementPrivileges } = require('../constants/constants')
const userModel = require('../models/userModel')

exports.checkCreateTask = async(req, res, next) => {
    const token = req.cookies.auth_token
    const decodedToken = await decodeToken(token)
    const { email, account } = decodedToken
    const { user_privilege } = await userModel.retrieveUserDetails(email, account)
    if (taskCreationPrivilege.includes(user_privilege) || taskManagementPrivileges.includes(user_privilege)) return next()
    return res.status(403).json({message: 'Forbidden privilege'})
}

exports.checkEditTask = async(req, res, next) => {
    const token = req.cookies.auth_token
    const decodedToken = await decodeToken(token)
    const { email, account } = decodedToken
    const { user_privilege } = await userModel.retrieveUserDetails(email, account)
    if (taskEditorPrivilege.includes(user_privilege) || taskManagementPrivileges.includes(user_privilege)) return next()
    return res.status(403).json({message: 'Forbidden privilege'})
}

exports.checkManageTask = async(req, res, next) => {
    const token = req.cookies.auth_token
    const decodedToken = await decodeToken(token)
    const { email, account } = decodedToken
    const { user_privilege } = await userModel.retrieveUserDetails(email, account)
    if (taskManagementPrivileges.includes(user_privilege)) return next()
    return res.status(403).json({message: 'Forbidden privilege'})
}