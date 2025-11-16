const jwt = require('jsonwebtoken')
const config = require('../config/config')

exports.createToken = async(email) => {
    return jwt.sign(
        {
            email: email
        },
        config.jwtSecret,
        {
            expiresIn: '8h'
        }
    );
}