const userModel = require('../models/userModel')
const { decodeToken } = require('../utils/decodeToken')

exports.checkStatus = async (req, res) => {
    if (req.cookies && (req.cookies.auth_token) ) {
        try {
            const decoded = await decodeToken(req.cookies.auth_token)
            console.log(decoded)
            const checkSession = await userModel.checkSession(req.cookies.auth_token, decoded.account)
            if ( checkSession && checkSession.session_status == 'active' ) {
                    console.log('session is valid, proceeding')
                    return res.status(200).json({ isAuthenticated: true, user: { email: checkSession.user_email, userRole: checkSession.user_privilege, account: decoded?.account} })
                    }
            return res.status(401).json({isAuthenticated: false})
        }
        catch(err) {
            console.log('Error: ', err)
            return res.status(400).json({isAuthenticated: false});
        }
    }
    else {
        console.log('user is not authenticated')
        return res.status(400).json({isAuthenticated: false});
    }
}