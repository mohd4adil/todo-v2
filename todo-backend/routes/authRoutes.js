const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/loginHandler');
const { checkStatus } = require('../controllers/checkLogin')
// const googleAuth  = require('../controllers/googleAuth.js.bak')
const { signUp } = require('../controllers/signUpHandler');
const { revokeSession } = require('../controllers/session');
const { checkAccounts } = require('../controllers/checkAccounts');
const { validatePreAuth } = require('../schema/validate')
const googleAuth = require('../controllers/googleAuth')
const { createSessionGoogle } = require('../controllers/session')

router.post('/check-accounts', checkAccounts)
router.post('/login', loginUser);
router.post('/signup' ,signUp)
router.post('/logout', revokeSession)
router.post('/checkLogin', checkStatus);
router.get('/google', googleAuth.googleAuth.bind(googleAuth))
router.get('/google/callback', googleAuth.googleCallback.bind(googleAuth))
router.post('/session', createSessionGoogle)

module.exports = router;
