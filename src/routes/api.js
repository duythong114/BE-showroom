import express from 'express';
import userController from '../controllers/userController';
import checkAccessToken from '../middlewares/checkAccessToken';
import checkAuthorization from '../middlewares/checkAuthorization';
import carController from '../controllers/carController'

const router = express.Router();

const apiRouter = (app) => {
    // router.all('*', checkAccessToken, checkAuthorization,)

    // user api
    router.get('/user/get-user-refresh', userController.handleGetUserRefresh)
    router.post('/user/login-user', userController.handleLoginUser)
    router.get('/user/logout-user', userController.handleLogoutUser)
    router.post('/user/register', userController.handleRegisterUser)
    router.get('/user/get-all-users', userController.handleGetAllUsers)
    router.get('/user/get-one-user', userController.handleGetUserById)
    router.post('/user/create-user', userController.handleCreateUser)
    router.get('/user/delete-user', userController.handleDeleteUser)
    router.post('/user/update-user', userController.handleUpdateUser)

    // car api
    router.get('/car/get-all-cars', carController.handleGetAllCars)
    router.post('/car/create-new-car', carController.handleCreateNewCar)
    router.get('/car/delete-car', carController.handleDeleteCar)
    router.post('/car/update-car', carController.handleUpdateCar)
    router.get('/car/get-one-car', carController.handleGetCarById)
    router.get('/car/get-cars-by-model', carController.handleGetCarsByModel)

    return app.use('/api', router)
}

export default apiRouter;