const db = require('./dbConnection');
const { fetchAccount } = require('../utils/decodeToken')

class UserModel {

    async retrieveGenericUserDetails(userEmail) {
        try {
            const sql = 'SELECT account FROM users WHERE user_email =$1';
            const params = [userEmail];
            const response = await db.query(sql, params);
            return response.rows;
        }
        catch(err) {
            console.error('Failed to connect to database')
        }
    }

    async retrieveUserDetails(userEmail, account) {
        try {
            const sql = 'SELECT user_email, user_password, user_privilege FROM users WHERE user_email =$1 and account=$2';
            const params = [userEmail, account];
            const response = await db.query(sql, params);
            return response.rows[0];
        }
        catch(err) {
            console.error('Failed to connect to database')
        }
    }

    async checkUserExists(userEmail) {
        try {
            const sql = 'SELECT * FROM users WHERE user_email=$1'
            const params = [userEmail, account]
            const response = await db.query(sql, params)
            return (response.rowCount === 1);
        }
        catch(err) {
            console.log('could not find if user exists')
        }
    }

    async checkExisting(userEmail, account) { //meant for checking during sign up if account already exists, can be negated to check during login if user does not exist
        try {
            const sql = 'SELECT * FROM users WHERE user_email=$1 AND account=$2'
            const params = [userEmail, account]
            const response = await db.query(sql, params)
            return (response.rowCount === 1);
        }
        catch(err) {
            console.log('could not find if user exists')
        }
    }

    async getUsers(account) {
        try {
            const sql =  `SELECT user_email, user_privilege FROM users where account=$1`
            const params = [account]
            const response = await db.query(sql, params)
            if (response.rowCount > 0) return response.rows
            return []
        }
        catch(err) {
            console.log('failed to fetch users, error: ', err)
        }
    }

    async getUserRoles() {
        try {
            const sql =  `SELECT unnest(enum_range(NULL::user_roles));`
            const response = await db.query(sql)
            if (response.rowCount > 1) return response.rows
            return []
        }
        catch(err) {
            console.log('failed to fetch users, error: ', err)
        }
    }

    async createAccountUser(userEmail, hashedPassword, account) {
        try {
            const sql = `INSERT INTO users (account, user_email, user_password, login_type, session_status, user_privilege)
                         VALUES ($1, $2, $3, 'normal', 'inactive', 'AccountOwner')`
            const params = [account, userEmail, hashedPassword]
            const response = await db.query(sql, params)
            return (response.rowCount === 1)
        }
        catch(err) {
            throw new Error(err)
        }
    }

    async createUser(userEmail, password, account, user_privilege) {
        try {
            const sql = `INSERT INTO users (account, user_email, user_password, login_type, session_status, user_privilege)
                         VALUES ($1, $2, $3, 'normal', 'inactive', $4)`
            const params = [account, userEmail, password, user_privilege]
            const response = await db.query(sql, params)
            return (response.rowCount === 1)
        }
        catch(err) {
            throw new Error(err)
        }
    }

    async createUserGoogle(userEmail, account) {
        try {
            const loginType = 'google'
            console.log('creating an oauth user')
            const sql = `INSERT INTO users (account, user_email, login_type, session_status)
                VALUES ($1, $2, $3, 'inactive')`
            const params = [account, userEmail, loginType]
            const response = await db.query(sql, params)
            return response
        }
        catch(err) {
            console.log('error:', err)
            throw new Error(err)
        }
    }

    async editUser(userEmail, account, user_privilege) {
        try {
            const sql = `UPDATE users SET user_privilege=$1 where user_email=$2 and account=$3`
            const params = [user_privilege, userEmail, account]
            const response = await db.query(sql, params)
            return (response.rowCount === 1)
        }
        catch(err) {
            throw new Error(err)
        }
    }

    async deleteUser(userEmail, account) {
        try {
            const sql = `DELETE FROM users where user_email=$1 and account=$2`
            const params = [userEmail, account]
            const response = await db.query(sql, params)
            return (response.rowCount === 1)
        }
        catch(err) {
            throw new Error(err)
        }
    }

    async addSession(sessionToken, account, userEmail) {
        try {
            const sql = "UPDATE users SET session_token = $1, session_status = 'active' where user_email=$2 and account=$3"
            const params = [sessionToken, userEmail, account]
            const response = await db.query(sql, params)
            return (response.rowCount > 0)
        }
        catch(err) {
            console.log('ERROR: ',err)
            throw new Error(err);
        }
    }

    async revokeSession(userEmail, sessionToken) {
        try {
            const account = await fetchAccount(sessionToken)
            const sql = "UPDATE users SET session_token = NULL, session_status = 'inactive' where user_email=$1 AND account = $2"
            const params = [userEmail, account]
            const response = await db.query(sql, params)
            return (response.rowCount === 1)
        }
        catch(err) {
            console.log('ERROR: ',err)
            throw new Error(err);
        }
    }

    async checkSession(sessionToken) {
        try {
            const sql = "SELECT user_email, session_status, user_privilege FROM users WHERE session_token=$1"
            const params = [sessionToken]
            const response = await db.query(sql, params)
            return response.rows[0]
        }
        catch(err) {
            console.log('ERROR: ',err)
            throw new Error(err);   
        }
    }

}

module.exports = new UserModel();