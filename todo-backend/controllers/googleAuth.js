const crypto = require('crypto')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const AccountModel = require('../models/accountModel')
const userModel = require('../models/userModel')
const { createToken } = require('../services/tokenIssuer')
const config = require('../config/config')
const accountModel = require('../models/accountModel')
const { createAccountName } = require('../utils/generateAccountName')

class googleAuth {

    constructor() {
        this.clientId = config.clientId
        this.clientSecret = config.clientSecret
        this.redirectUri = config.callbackUrl
        this.googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
        this.googleTokenUrl = 'https://oauth2.googleapis.com/token'
        this.state = crypto.randomBytes(20).toString('hex')
        this.userInfoEndpoint = 'https://openidconnect.googleapis.com/v1/userinfo'
        this.loginType = 'google'
        this.authType = ''

        const fetchUserInfoEndpoint = async() => {
            try {   
                const response = await axios.get('https://accounts.google.com/.well-known/openid-configuration')
                this.userInfoEndpoint = response.data.userinfo_endpoint;

            }
            catch(err) {
                console.log('unable to fetch user info endpoint')
            }
        }
        fetchUserInfoEndpoint()

    }

    async googleAuth(req, res) {
        const authType = req.query?.from
        this.authType = authType
        const queryString = `?client_id=${this.clientId}&redirect_uri=http://localhost:5000/api/auth/google/callback&response_type=code&scope=openid email profile&state=${this.state}`
        res.redirect(302, `${this.googleAuthUrl}${queryString}`)
    }

    async validateIdToken(idToken) {
        const {iss, aud, exp} = jwt.decode(idToken)
        return ((iss === 'https://accounts.google.com') && (aud === this.clientId) && (exp * 1000 >= Date.now()) )
    }

    async googleCallback(req, res) { // handling both sign up and login with the auth variable
        const state = req.query.state
        if (this.state != state) {
            return res.status(500).json({message : 'Unable to login via Google'});
        }
        const queryString = `?code=${req.query.code}&client_id=${this.clientId}&client_secret=${this.clientSecret}&redirect_uri=http://localhost:5000/api/auth/google/callback&grant_type=authorization_code`
        try {
            const response = await axios.post(`${this.googleTokenUrl}${queryString}`)
            const { id_token, access_token } = response.data
            const isValid = this.validateIdToken(id_token)
            if (!isValid) {
                console.log('token is not valid')
                return res.status(500).json({message: 'Error during login'})
            }
            console.log(this.userInfoEndpoint)
            const userInfo = await axios.get(this.userInfoEndpoint, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            }); 
            const { email } = userInfo.data;
            const accounts = await userModel.retrieveGenericUserDetails(email)

            if (!accounts && this.authType == 'login') {
                console.log('shouldnt be here')
                return res.redirect(`${config.loginPage}?type=fail&message=Account does not exist`)
            }
            if(accounts && (this.authType == 'login' || (accounts.length > 0 && this.authType == 'signup'))) {
                const token = await createToken(email)
                console.log(`${email} successfully signed in, sending response with list of accounts`)
                return res.redirect(`${config.loginPage}?accounts=${JSON.stringify(accounts)}&token=${token}&authType='google'`)
            }
            else { //means account does not exist and sign up for first time
                console.log('HEREE')
                try {
                    const accountName = await createAccountName(email)
                    const isAccountCreated = await accountModel.createAccount(accountName)
                    const result = await userModel.createUserGoogle(email, accountName)
                    if (accountName && isAccountCreated && result.rowCount > 0) {
                        console.log('Created google user in table');
                        return res.redirect(302, `${config.loginPage}?type=success&message=Account created successfully`);
                    }
                    else {
                        console.log('failed to create user')
                        return res.redirect(`${config.loginPage}?type=fail&message=Unexpected error during login, try again later`)
                    }
                }
                catch(err) {
                    return res.redirect(`${config.loginPage}?type=fail&message=Failed to login with google, try again later`)
                }
            }

        }
        catch(err) {
            console.log('ERRRORRR: ', err)
            res.status(500).json({message: 'Could not login via Google'})

        }
    }

}

module.exports = new googleAuth();