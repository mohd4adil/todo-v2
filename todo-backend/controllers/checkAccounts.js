const userModel = require('../models/userModel');

exports.checkAccounts = async(req,res) => {
    console.log(`Request body:`, req.body);
    
    if (!req.body.email) return res.status(400).json({message: 'User email does not exist'})
    const accounts = await userModel.retrieveGenericUserDetails(req.body.email)
    console.log('HEREEE: ', accounts)
    return res.status(200).json({accounts: accounts})
}
