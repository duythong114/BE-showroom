import jwt from 'jsonwebtoken';
require('dotenv').config();

const createAccessToken = (payload) => {
    let token = null
    try {
        token = jwt.sign(payload, process.env.ACCESS_TOKEN_SIGNATURE, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME })
    } catch (error) {
        console.log(error)
    }
    return token
}

const verifyAccessToken = (token) => {
    let decoded = null
    try {
        decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SIGNATURE)
    } catch (error) {
        console.log(error)
    }

    return decoded
}

const createRefreshToken = (payload) => {
    let token = null
    try {
        token = jwt.sign(payload, process.env.REFRESH_TOKEN_SIGNATURE, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME })
    } catch (error) {
        console.log(error)
    }
    return token
}

const verifyRefreshToken = (token) => {
    let decoded = null

    try {
        decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SIGNATURE)
    } catch (error) {
        console.log(error)
    }

    return decoded
}


module.exports = {
    createAccessToken: createAccessToken,
    verifyAccessToken: verifyAccessToken,
    createRefreshToken: createRefreshToken,
    verifyRefreshToken: verifyRefreshToken
}