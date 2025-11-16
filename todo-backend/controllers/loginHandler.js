const { createSession } = require('../services/sessionIssuer')
const bcrypt = require('bcrypt');
const { promisify } = require('util');
const compare = promisify(bcrypt.compare);
const userModel = require('../models/userModel');
const config = require('../config/config')
const { loginTypes } = require('../constants/constants.js')
const { createToken } = require('../services/tokenIssuer')



exports.loginUser = async(req,res) => {
    console.log(`Request body:`, req.body);

    switch(req.body.type) {
        case loginTypes.normal :
                const account = req.body.accountName
                const email = req.body.email;
                const password = req.body.password;
                const genericErrorMessage = "Incorrect credentials"
                try {
                    const user = await userModel.retrieveUserDetails(email, account)
                    if (user) {
                        const { user_password, user_privilege } = user;
                        try {
                            const result = await compare(password, user_password);
                            console.log(result)
                            if (result) {
                                try {
                                
                                const token = await createSession(account, email, user_privilege, req.body.type) // this should be for if he exists and this a login, if he does exist and this is a signup, it should fail
                                // const token = await createToken(email)
                                // res.redirect(302, `${config.sessionUrl}?accountName=${account}&token=${token}&loginType=normal` )
                                res.cookie('auth_token', token, {
                                    httpOnly: true, 
                                    secure: false,
                                    sameSite: 'lax',
                                    maxAge: 8 * 60 * 60 * 1000,
                                } )
                                const isSessionUpdated = await userModel.addSession(token, account, email)
                                // if (isSessionUpdated) return res.redirect(200, config.homePage)
                                if (isSessionUpdated) return res.status(200).json({ isAuthenticated: true, user: {email: email, account: account, userRole: user_privilege}})
                                return res.redirect(200, config.loginPage)
                            }
                            catch (err) {
                                console.log(err)
                            }
                            }
                            else {
                                res.status(401).json({ message: genericErrorMessage})
                            }
                            }
                        catch(error) {
                            console.log("Error during password verification", error)
                            res.status(500).json({
                                message: genericErrorMessage
                            })
                        }}
                    else {
                        console.log("user does not exist")
                        res.status(401).json({
                            message: genericErrorMessage
                        })
                    }}
                catch(err) {
                    console.error('Could not verify details')
                }
        break;
        
        case loginTypes.googleLogin:
            res.status(200).json({redirectUrl: config.googleAuthPage})
            break;
}
}
