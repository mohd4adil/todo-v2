const bcrypt = require('bcrypt');
const config = require('../config/config')
const accountModel = require('../models/accountModel');
const userModel = require('../models/userModel');
const { signUpTypes } = require('../constants/constants.js')



exports.signUp = async(req,res) => {

    console.log(`Request body:`, req.body);
    console.log(`Request type: ${req.body.type}`)
        switch(req.body.type) {
            case signUpTypes.normal :
                const account = req.body.accountName
                const email = req.body.email;
                const password = req.body.password;
                const genericErrorMessage = "Failed to create account, try again later"
                try {
                    const hashedPassword = await bcrypt.hash(password, config.password.saltRounds)
                    const accountExists = await accountModel.accountExists(account)
                    const userExists = await userModel.checkExisting(email, account)
                    if (accountExists || userExists) return res.status(400).json({message: 'Account or User already exists'})
                    try {
                        const accountDetails = await accountModel.createAccount(account)
                        const userDetails = await userModel.createAccountUser(email, hashedPassword, account)
                        if (accountDetails && userDetails) {
                            res.status(201).json({message: 'Account created successfully'})
                        }
                    }
                    catch (err) {
                        res.status(500).json({message: genericErrorMessage})
                        throw new Error(err)
                    }
                }
                catch(err) {
                    res.status(500).json({message: genericErrorMessage})
                    throw new Error(genericErrorMessage)
                }
            break;
            case signUpTypes.googleSignUp :
                console.log('google sign up')
                return res.status(200).json({redirectUrl: config.googleAuthPage})
            default: console.log('Invalid request type')
                console.log(signUpTypes.googleSignUp)
                console.log(req.body.type)
                break;
}

}
