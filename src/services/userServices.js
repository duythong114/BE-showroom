import bcrypt from "bcryptjs";
import db from '../models/index';
import { raw } from "body-parser";

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

let loginUser = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isEmailExist = await checkUserEmail(email)
            if (isEmailExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['id', 'email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender'],
                    include: { model: db.Group, attributes: ['name', 'description'] },
                    nest: true,
                    raw: true
                })
                if (user) {
                    let checkPassword = bcrypt.compareSync(password, user.password)
                    if (checkPassword) {
                        delete user.password
                        resolve({
                            status: 200,
                            errorCode: 0,
                            errorMessage: 'Login successfully',
                            data: user
                        })
                    } else {
                        resolve({
                            status: 500,
                            errorCode: 3,
                            errorMessage: 'Your password is incorrect',
                            data: ""
                        })
                    }
                }
            } else {
                resolve({
                    status: 500,
                    errorCode: 2,
                    errorMessage: "User not found",
                    data: ""
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                attributes: ['id', 'email', 'firstName', 'lastName', 'address', 'phoneNumber', 'groupId'],
                raw: true
            })
            resolve({
                status: 200,
                errorCode: 0,
                errorMessage: 'Get all users successfully',
                data: users
            })
        } catch (error) {
            reject(error)
        }
    })
}

let getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                attributes: ['id', 'email', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender'],
                include: { model: db.Group, attributes: ['name', 'description'] },
                nest: true,
                raw: true
            })
            if (user) {
                resolve({
                    status: 200,
                    errorCode: 0,
                    errorMessage: 'Get user successfully',
                    data: user
                })
            } else {
                resolve({
                    status: 500,
                    errorCode: 2,
                    errorMessage: 'User not found',
                    data: ""
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
            let arrInput = [data.email, data.password, data.firstName, data.lastName, data.address, data.phoneNumber, data.gender, data.groupId]
            let arrInputName = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender', 'groupId']
            for (let i = 0; i < arrInput.length; i++) {
                if (!arrInput[i]) {
                    resolve({
                        status: 500,
                        errorCode: 2,
                        errorMessage: `Missing parameter ${arrInputName[i]}`,
                        data: ""
                    })
                }
            }

            let isEmailExist = await checkUserEmail(data.email)
            if (!isEmailExist) {
                let hashPassword = await hashUserPassword(data.password)
                await db.User.create({
                    email: data.email,
                    password: hashPassword,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    groupId: data.groupId,
                })
                resolve({
                    status: 200,
                    errorCode: 0,
                    errorMessage: 'Create a new user successfully',
                    data: ""
                })
            } else {
                resolve({
                    status: 500,
                    errorCode: 3,
                    errorMessage: 'Your email is already existed, Pls try another email',
                    data: ""
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
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                user.destroy()

                resolve({
                    status: 200,
                    errorCode: 0,
                    errorMessage: 'User deleted successfully',
                    data: ""
                })
            } else {
                resolve({
                    status: 500,
                    errorCode: 2,
                    errorMessage: 'User not found',
                    data: ""
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
                    status: 500,
                    errorCode: 1,
                    errorMessage: 'Missing required parameter',
                    data: ""
                })
            }

            let newUser = await db.User.findOne({
                where: { id: data.id },
                attributes: ['id', 'firstName', 'lastName', 'address', 'phoneNumber']
            })

            if (newUser) {
                newUser.firstName = data.firstName
                newUser.lastName = data.lastName
                newUser.address = data.address
                newUser.phoneNumber = data.phoneNumber

                await newUser.save()

                resolve({
                    status: 200,
                    errorCode: 0,
                    errorMessage: 'Update user successfully',
                    data: newUser
                })
            } else {
                resolve({
                    status: 500,
                    errorCode: 2,
                    errorMessage: 'User not found',
                    data: ""
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let paginationUserList = (page, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let offSet = (page - 1) * limit

            const { count, rows } = await db.User.findAndCountAll({
                attributes: ['id', 'email', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender'],
                include: { model: db.Group, attributes: ['name', 'description'] },
                nest: true,
                raw: true,
                offset: offSet,
                limit: limit,
            });

            if (count && rows) {
                let totalPages = Math.ceil(count / limit)

                let data = {
                    totalPages: totalPages,
                    users: rows
                }

                resolve({
                    status: 200,
                    errorCode: 0,
                    errorMessage: "fetch users with pagination successfully",
                    data: data,
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
    getUserById: getUserById,
    createUser: createUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
    paginationUserList: paginationUserList,
}

