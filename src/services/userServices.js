import bcrypt from "bcryptjs";
import db from '../models/index';

let hashUserPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);

    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (error) {
            reject(error)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error);
        }
    })
}

let checkUserId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error);
        }
    })
}

let loginUser = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isEmailExist = await checkUserEmail(email)
            if (isEmailExist) {
                let user = await db.User.findOne({
                    where: { email: email }
                })
                if (user) {
                    let checkPassword = bcrypt.compareSync(password, user.password)
                    if (checkPassword) {
                        resolve({
                            errorCode: 0,
                            message: 'Login successfully'
                        })
                    } else {
                        resolve({
                            errorCode: 3,
                            errorMessage: 'Your password is incorrect'
                        })
                    }
                }
            } else {
                resolve({
                    errorCode: 2,
                    errorMessage: "User not found"
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            let user = ''

            if (userId === 'All') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
                resolve({
                    errorCode: 0,
                    errorMessage: 'Get users successfully',
                    users
                })
            }

            let isIdExist = await checkUserId(userId)

            if (isIdExist && userId !== 'All') {
                user = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
                resolve({
                    errorCode: 0,
                    errorMessage: 'Get user successfully',
                    user
                })
            } else {
                resolve({
                    errorCode: 2,
                    errorMessage: 'User not found'
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

let createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isEmailExist = await checkUserEmail(data.email)
            if (!isEmailExist) {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password)
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.roleId,
                })
                resolve({
                    errorCode: 0,
                    message: 'Create a new user successfully'
                })
            } else {
                resolve({
                    errorCode: 1,
                    message: 'Your email is already existed, Pls try another email'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isUserIdExit = await checkUserId(userId)
            if (userId && isUserIdExit) {
                await db.User.destroy({
                    where: { id: userId }
                })
                resolve({
                    errorCode: 0,
                    message: 'User deleted successfully'
                })
            } else {
                resolve({
                    errorCode: 2,
                    errorMessage: 'User not found'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errorCode: 1,
                    errorMessage: 'Missing required parameter'
                })
            }

            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })

            if (user) {
                // user.id = data.id
                user.email = data.email
                user.firstName = data.firstName
                user.lastName = data.lastName

                await user.save()

                resolve({
                    errorCode: 0,
                    message: 'Update user successfully'
                })
            } else {
                resolve({
                    errorCode: 2,
                    errorMessage: 'User not found'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    loginUser: loginUser,
    getAllUsers: getAllUsers,
    createUser: createUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
}

