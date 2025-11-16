const db = require('./dbConnection');

class AccountModel {

    async accountExists(account) {
        try {
            const sql = 'SELECT * from accounts where account=$1';
            const params = [account];
            const response = await db.query(sql, params);
            if (response.rowCount > 0) {
                return true
            }
            return false
        }
        catch(err) {
            console.error('failed to execute query')
            return false
        }
    }

    async createAccount(account) {
        try {
            const sql = `INSERT INTO accounts(account) 
            VALUES ($1)
            RETURNING *`
            const params = [account]
            const response = await db.query(sql, params)
            return (response.rowCount === 1)
        }
        catch (e) {
            console.log('error:', e)
            throw new Error(e)
        }
    }

    async editAccount(newAccount, oldAccount) {
        try {
            const sql = `UPDATE accounts SET account=$1 WHERE account=$2;`
            const params = [newAccount, oldAccount]
            const response = await db.query(sql, params)
            if (response.rowCount > 0) return true
            return false
        }
        catch (e) {
            console.log('error:', e)
            throw new Error(e)
        }
    }

    async deleteAccount(account) {
        try {
            const sql = `DELETE FROM accounts WHERE account=$1;`
            const params = [account]
            const response = await db.query(sql, params)
            if (response.rowCount > 0) return true
            return false
        }
        catch (e) {
            console.log('error:', e)
            throw new Error(e)
        }
    }
}
module.exports = new AccountModel();