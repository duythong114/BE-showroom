import userServices from '../services/userServices';

let handleLoginUser = async (req, res) => {
    try {
        let email = req.body.email
        let password = req.body.password
        if (email && password) {
            let response = await userServices.loginUser(email, password)
            return res.status(response.status).json({
                errorCode: response.errorCode,
                errorMessage: response.errorMessage,
                data: response.data
            })
        } else {
            return res.status(500).json({
                errorCode: 1,
                errorMessage: "Missing email or password",
                data: ""
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Error from server',
        })
    }
}

let handleGetAllUsers = async (req, res) => {
    try {
        // let page = req.query.page
        // let limit = req.query.limit
        let { page, limit } = req.query

        // check if pagination 
        if (page && limit) {
            let paginationUsers = await userServices.paginationUserList(+page, +limit)
            return res.status(paginationUsers.status).json({
                errorCode: paginationUsers.errorCode,
                errorMessage: paginationUsers.errorMessage,
                data: paginationUsers.data
            })
        } else {
            let users = await userServices.getAllUsers()
            return res.status(users.status).json({
                errorCode: users.errorCode,
                errorMessage: users.errorMessage,
                data: users.data
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Error from server',
        })
    }
}

let handleGetUserById = async (req, res) => {
    try {
        let id = req.query.id
        if (id) {
            let user = await userServices.getUserById(id)
            return res.status(user.status).json({
                errorCode: user.errorCode,
                errorMessage: user.errorMessage,
                data: user.data
            })
        } else {
            return res.status(500).json({
                errorCode: 1,
                errorMessage: "Missing required parameter",
                data: ""
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Error from server',
        })
    }
}

let handleCreateUser = async (req, res) => {
    try {
        let data = {
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            gender: req.body.gender,
            groupId: req.body.groupId
        }

        if (data) {
            let response = await userServices.createUser(data)
            return res.status(response.status).json({
                errorCode: response.errorCode,
                errorMessage: response.errorMessage,
                data: response.data
            })
        } else {
            return res.status(500).json({
                errorCode: 1,
                errorMessage: "Missing required parameter",
                data: ""
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Error from server',
        })
    }
}

let handleDeleteUser = async (req, res) => {
    try {
        let id = req.query.id
        if (id) {
            let response = await userServices.deleteUser(id)
            return res.status(response.status).json({
                errorCode: response.errorCode,
                errorMessage: response.errorMessage,
                data: response.data
            })
        } else {
            return res.status(500).json({
                errorCode: 1,
                errorMessage: "Missing required parameter",
                data: ""
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Error from server',
        })
    }
}

let handleUpdateUser = async (req, res) => {
    try {
        let data = req.body
        let response = await userServices.updateUser(data)
        return res.status(response.status).json({
            errorCode: response.errorCode,
            errorMessage: response.errorMessage,
            data: response.data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Error from server',
        })
    }
}

module.exports = {
    handleLoginUser: handleLoginUser,
    handleGetAllUsers: handleGetAllUsers,
    handleGetUserById: handleGetUserById,
    handleCreateUser: handleCreateUser,
    handleDeleteUser: handleDeleteUser,
    handleUpdateUser: handleUpdateUser,
}