const jwt = require('jsonwebtoken')
const config = require('../config/config')

const JWT_SECRET = process.env.JWT_SECRET || config.jwtSecret

function verifyExpiry(expiryTime)  {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    return expiryTime > currentTimeInSeconds;
}

const middlewareAuth = async(req, res, next) => {
    if(req.path === '/api/auth/login' || req.path === '/api/auth/google' || req.path === '/api/auth/google/callback' || req.path === '/api/auth/checkLogin' || req.path === '/api/auth/signup' || req.path === '/api/auth/check-accounts' || req.path === '/api/auth/session') {
        console.log('middleware clear')
        return next() }
    if(!req.cookies.auth_token) {
        console.log('denied entry!! ', req.path)
        return res.sendStatus(401)
    }
    const sessionToken = req.cookies.auth_token
    try {
        const payload = jwt.verify(sessionToken, JWT_SECRET)
        const expTime = payload.exp
        const isValid = verifyExpiry(expTime)
        if(isValid) {
            console.log('passed')
            return next()
        }
        else {
            console.log('failing verifications')
             return res.sendStatus(401)
        }
    }
    catch(e) {
        console.log(e)
        return res.sendStatus(401)
    }
}

module.exports = middlewareAuth;