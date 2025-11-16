const { decodeToken } = require('../utils/decodeToken')
const { userManagementPrivileges } = require('../constants/constants')

exports.checkUserManagementPrivilege = async(req, res, next) => {
    const token = req.cookies.auth_token
    const decodedToken = await decodeToken(token)
    const role = decodedToken.user_role
    
    for (const privilege of userManagementPrivileges) {
        if (role === privilege) return next()
        return res.status(403).json({message: 'Forbidden privilege'})
    }
}