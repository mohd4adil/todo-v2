const jwt = require('jsonwebtoken')
const config = require('../config/config')


exports.decodeToken = (jwtToken) => {
    try {
        const decoded = jwt.verify(jwtToken, config.jwtSecret)
        return decoded
    }
    catch(err) {
        console.log('failed here')
        return null
    }

}

exports.fetchAccount = (sessionToken) => {
    try {
        const decoded = exports.decodeToken(sessionToken)
        return decoded?.account || ''
    }
    catch (err) {
        console.log('failed to get account, err: ', err)
        return ''
    }
} 