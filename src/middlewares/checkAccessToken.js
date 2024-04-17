import { verifyAccessToken } from '../services/JWTServices'

const nonSecurePaths = ['/user/logout-user', '/user/login-user', '/user/register']

const checkAccessToken = async (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next()

    let cookies = req.cookies
    if (cookies && cookies.accessToken) {
        let accessToken = cookies.accessToken
        let decoded = await verifyAccessToken(accessToken)
        if (decoded) {
            req.user = decoded
            next()
        }
    } else {
        return res.status(400).json({
            errorCode: 1,
            errorMessage: 'PLease login to continue',
            data: ''
        })
    }
}

export default checkAccessToken