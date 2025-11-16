const { generatePassword } = require('../../utils/generatePassword')
const userModel = require('../../models/userModel')
const { decodeToken } = require('../../services/sessionIssuer')

exports.fetchUsers = async(req, res) => {
    try {
        const token = await decodeToken(req.cookies.auth_token)
        const users = await userModel.getUsers(token.account)
        return res.status(200).json({users: users})
    }
    catch(err) {
        console.log('failed to fetch users')
        return res.status(200).json({users: null})
    }
}

exports.fetchUserRoles = async(req, res) => {
    try {
        const roles = await userModel.getUserRoles()
        const userRoles = roles.map(role => (
            role.unnest
        ))
        return res.status(200).json({roles: userRoles})
    }
    catch(err) {
        console.log('failed to fetch users')
        return res.status(200).json({roles: null})
    }
}

exports.createUser = async(req, res) => {
    try {
        const email = req.body.email
        const role = req.body.userRole
        const token = await decodeToken(req.cookies.auth_token)
        const userExists = await userModel.checkExisting(email, token.account)
        if (userExists) return res.status(400).json({message: 'User already exists'})
        const { password, passwordHash } = await generatePassword()
        console.log(`For user: ${email}, here is the password: ${password}`)
        const userCreated = await userModel.createUser(email, passwordHash, token.account, role)
        if (!userCreated) return res.status(500).json({message: 'Failed to create user'})
        return res.status(201).json({message: 'User successfully created'})
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({message: 'Failed to create user'})
    }
}

exports.editUser = async(req, res) => {
    try {
        const email = req.body.email
        const role = req.body.userRole
        const token = await decodeToken(req.cookies.auth_token)
        const userExists = await userModel.checkExisting(email, token.account)
        if (!userExists) return res.status(400).json({message: 'User does not exist'})
        const userEdited = await userModel.editUser(email, token.account, role)
        if (!userEdited) return res.status(500).json({message: 'Failed to edit user'})
        return res.status(201).json({message: 'User role modified'})
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({message: 'Failed to edit user'})
    }
}

exports.deleteUser = async(req, res) => {
    try {
        const email = req.body.email
        const token = await decodeToken(req.cookies.auth_token)
        const userExists = await userModel.checkExisting(email, token.account)
        if (!userExists) return res.status(400).json({message: 'User does not exist'})
        const userDeleted = await userModel.deleteUser(email, token.account)
        if (!userDeleted) return res.status(500).json({message: 'Failed to delete user'})
        return res.status(201).json({message: 'User deleted successfully'})
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({message: 'Failed to create user'})
    }
}