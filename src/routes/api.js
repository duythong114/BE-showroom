import express from 'express';
import userController from '../controllers/userController';
import checkAccessToken from '../middlewares/checkAccessToken';
import checkAuthorization from '../middlewares/checkAuthorization';

const router = express.Router();

const apiRouter = (app) => {
    // user api
    router.all('*', checkAccessToken, checkAuthorization,)

    router.post('/user/login-user', userController.handleLoginUser)
    router.post('/user/register', userController.handleRegisterUser)
    router.get('/user/get-all-users', userController.handleGetAllUsers)
    router.get('/user/get-one-user', userController.handleGetUserById)
    router.post('/user/create-user', userController.handleCreateUser)
    router.delete('/user/delete-user', userController.handleDeleteUser)
    router.put('/user/update-user', userController.handleUpdateUser)

    return app.use('/api', router)
}

export default apiRouter;