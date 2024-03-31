import express from 'express';
// import { getHomePage } from '../controller/homeController';
import userController from '../controllers/userController';

const router = express.Router();

const apiRouter = (app) => {
    router.post('/api/login-user', userController.handleLoginUser)
    router.get('/api/get-all-users', userController.handleGetAllUsers)
    router.post('/api/create-user', userController.handleCreateUser)
    router.get('/api/delete-user', userController.handleDeleteUser)
    router.post('/api/update-user', userController.handleUpdateUser)

    return app.use('/', router)
}

export default apiRouter;