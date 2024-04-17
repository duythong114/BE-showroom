const nonSecurePaths = ['/user/logout-user', '/user/login-user', '/user/register']

const checkAuthorization = (req, res, next) => {
    if (nonSecurePaths.includes(req.path) || req.path === '/user/get-user-refresh') return next()

    if (req.user) {
        let currentPath = req.path
        let roles = req.user.roles
        let checkRoles = roles.some(item => item.url === currentPath)
        if (checkRoles) {
            next()
        } else {
            return res.status(402).json({
                errorCode: 3,
                errorMessage: `The user don't have permission`,
                data: ''
            })
        }
    } else {
        return res.status(400).json({
            errorCode: 2,
            errorMessage: 'PLease login to continue',
            data: ''
        })
    }
}

export default checkAuthorization