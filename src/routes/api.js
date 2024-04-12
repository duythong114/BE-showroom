import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

const apiRouter = (app) => {
    router.post('/user/login-user', userController.handleLoginUser)

    router.get('/user/get-all-users', userController.handleGetAllUsers)
    router.get('/user/get-one-user/:id', userController.handleGetUserById)
    router.post('/user/create-user', userController.handleCreateUser)
    router.delete('/user/delete-user', userController.handleDeleteUser)
    router.put('/user/update-user', userController.handleUpdateUser)

    return app.use('/api', router)
}

export default apiRouter;