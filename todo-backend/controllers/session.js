
const userModel = require('../models/userModel')
const config = require('../config/config')
const jwt = require('jsonwebtoken')

const verifySession = async(jwtToken) => {
    try {
    const decoded = jwt.verify(jwtToken, config.jwtSecret)
    if(decoded.exp * 1000 > Date.now()){
        throw new Error('Session expired')
    }
    return ({valid: true})
    }
    catch(err) {
        return({
            valid: false,
            error: err
        })
    }

}

const decodeToken = async(jwtToken) => {
    try {
        const decoded = jwt.verify(jwtToken, config.jwtSecret)
        return decoded
    }
    catch(err) {
        console.log(err)
        return null
    }

}

exports.createSessionGoogle = async(req, res) => {
    try {
        const accountName = req.body?.accountName;
        const emailToken = req.body?.token;
        const token = await decodeToken(emailToken)
        const userDetails = await userModel.retrieveUserDetails(token.email, accountName)
        console.log(userDetails)
        console.log(userDetails)
        const authToken = jwt.sign(
            {
                account: accountName,
                email: token.email,
                user_role: userDetails.user_privilege,
            },
            config.jwtSecret,
            {
                expiresIn: '8h'
            })
        const addSession = await userModel.addSession(authToken, accountName, token.email)
        if (!addSession) res.status(500).json({message: 'Failed to login'})
        res.cookie('auth_token', authToken, {
            httpOnly: true, 
            secure: false,
            sameSite: 'lax',
            maxAge: 8 * 60 * 60 * 1000,
        })
        return res.status(201).json({message: 'success'})
    }
    catch(error) {
        console.log(error)
        const errorMessage = 'Failed to login, try again later'
        res.redirect(200, `${config.loginPage}?type=fail&message=${errorMessage}`)
    }
}

// const createSession = async(req, res) => {
//     try {
//         //recevies : {account: accountName, token (which contains email)}
//         const account = req.query?.accountName;
//         const emailToken = req.query?.token
//         const { email } = await decodeToken(emailToken)
//         const userDetails = await userModel.retrieveUserDetails(email, account)
//         const authToken = jwt.sign({
//             account: account,
//             email: email,
//             user_role: userDetails.user_privilege
//         },
//         config.jwtSecret,
//         {
//             expiresIn: '8h'
//         })
//         const addSession = await userModel.addSession(authToken, account, email)
//         if (!addSession) res.status(500).json({message: 'Unexpected error occurred,, try again later'})
//         res.cookie('auth_token', authToken, {
//                 httpOnly: true,
//                 secure: false,
//                 sameSite: 'lax',
//                 maxAge: 8 * 60 * 60 * 1000 //8hours
//             })

//         return res.redirect(302, config.homePage)
//     }
//     catch(err) {
//         console.log(err)
//         return res.status(500).json({message: 'Unexpected error occurred,,, try again later'})
//     }
// }

// exports.sessionHandler = async(req, res) => {
//     console.log('clear')
//     try {
//         const loginType = req.query.loginType
//         console.log(loginType)
//         switch(loginType) {
//             case 'googleLogin':
//                 await createSessionGoogle(req, res)
//                 break
//             case 'normal':
//                 await createSession(req, res)
//                 break
//             default:
//                 res.status(400).json({message: 'Invalid login type'})
//         }
//     }
//     catch (err) {
//         res.status(500).json({message: 'Failed to switch sessions'})
//     }
// }


exports.revokeSession = async(req, res) => {
    try { 
        const userDetails = await userModel.checkSession(req.cookies.auth_token)
        const { user_email, session_status } = userDetails
        console.log(`userEmail: ${user_email}, session status: ${session_status}`)
        if (session_status === 'active') {
            console.log('user session is active, revoking')
            const revokeSession = await userModel.revokeSession(user_email, req.cookies.auth_token)
            if (revokeSession) {
                res.clearCookie('auth_token', {
                    httpOnly: true, 
                    secure: false,
                    sameSite: 'lax',
                    maxAge: 8 * 60 * 60 * 1000,
                })
                return res.status(200).json({message: 'Logged out successfully'})
            }
        }
    }
    catch(e) {
        console.log('could not log out')
        return res.status(500).json({message: 'could not log out, try later'})
    }
}

