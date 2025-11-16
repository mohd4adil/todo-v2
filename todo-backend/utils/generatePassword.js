const bcrypt = require('bcrypt')
const crypto = require('crypto')
const config = require('../config/config')

exports.generatePassword = async() => {
    try {
        const password = crypto.randomBytes(12).toString('base64')
        const passwordHash = await bcrypt.hash(password, config.password.saltRounds)
        return {
            password: password,
            passwordHash: passwordHash 
        }
    }
    catch(err) {
        console.log('Failed to generate password')
        return null
    }

}