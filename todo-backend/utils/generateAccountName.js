const accountModel = require('../models/accountModel')

verifyExists = async(accountName) => {
    return await accountModel.accountExists(accountName)
}

cleanSpecialCharacters = (string) => {
    const pattern = /[^a-zA-Z0-9]/
    return (string.replace(pattern, ""))
}

generateAccountName = async(cleanName) => {
    const accountName = `${cleanName}-${Math.round(Math.random() * 10000)}.todo.app`  
    const accountExists = await verifyExists(accountName)
    if (accountExists) return generateAccountName(cleanName)
    return accountName
}

exports.createAccountName = async(email) => {
    // const email = 'abc.abc@gmail.com'
    const index = email.indexOf('@')
    const name = email.substring(0, index)
    const cleanName = cleanSpecialCharacters(name)
    const accountName = await generateAccountName(cleanName)
    return accountName
    // console.log(accountName)
}