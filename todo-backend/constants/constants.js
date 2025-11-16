const signUpTypes = {
    googleSignUp : 'googleSignUp',
    normal : 'normal'
}

const loginTypes = {
    googleLogin: 'googleLogin',
    normal: 'normal'
}

const userManagementPrivileges = [ 'AccountOwner', 'Administrator' ]
const taskManagementPrivileges = ['AccountOwner', 'Administrator', 'TaskManager']
const taskCreationPrivilege = ['TaskCreator']
const taskEditorPrivilege = ['TaskEditor']

module.exports = { 
    signUpTypes, 
    loginTypes, 
    userManagementPrivileges, 
    taskManagementPrivileges, 
    taskCreationPrivilege, 
    taskEditorPrivilege 
}