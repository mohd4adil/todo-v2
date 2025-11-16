const jwt = require('jsonwebtoken')
const config = require('../config/config')

const createSession = async(account, email, user_role, type = 'normal') => {
    return jwt.sign(
        {
            account: account,
            email: email,
            user_role: user_role,
            type: type
        },
        config.jwtSecret,
        {
            expiresIn: '8h'
        }
    );
}

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
        console.log('failed here')
        return null
    }

}

module.exports = { createSession, verifySession, decodeToken }