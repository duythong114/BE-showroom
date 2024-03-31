import userServices from '../services/userServices';

let handleLoginUser = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    if (email && password) {
        let message = await userServices.loginUser(email, password)
        return res.status(200).json(message)
    } else {
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Missing username or password'
        })
    }
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; // two case: ALL, id
    if (id) {
        let users = await userServices.getAllUsers(id)
        return res.status(200).json({
            users
        })
    }
    else {
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Missing required parameter'
        })
    }
}

let handleCreateUser = async (req, res) => {
    let data = req.body
    let message = await userServices.createUser(data)
    return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {
    let id = req.query.id
    if (id) {
        let message = await userServices.deleteUser(id)
        return res.status(200).json(message)
    } else {
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Missing required parameter'
        })
    }
}

let handleUpdateUser = async (req, res) => {
    let data = req.body
    let message = await userServices.updateUser(data)
    return res.status(200).json(message)
}

module.exports = {
    handleLoginUser: handleLoginUser,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateUser: handleCreateUser,
    handleDeleteUser: handleDeleteUser,
    handleUpdateUser: handleUpdateUser,
}