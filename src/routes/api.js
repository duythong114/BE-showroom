import express from 'express';
import userController from '../controllers/userController';
import checkAccessToken from '../middlewares/checkAccessToken';
import checkAuthorization from '../middlewares/checkAuthorization';
import carController from '../controllers/carController'

const router = express.Router();

const apiRouter = (app) => {
    router.all('*', checkAccessToken, checkAuthorization,)

    // user api
    router.get('/user/get-user-refresh', userController.handleGetUserRefresh)
    router.post('/user/login-user', userController.handleLoginUser)
    router.get('/user/logout-user', userController.handleLogoutUser)
    router.post('/user/register', userController.handleRegisterUser)
    router.get('/user/get-all-users', userController.handleGetAllUsers)
    router.get('/user/get-one-user', userController.handleGetUserById)
    router.post('/user/create-user', userController.handleCreateUser)
    router.delete('/user/delete-user', userController.handleDeleteUser)
    router.put('/user/update-user', userController.handleUpdateUser)

    // car api
    router.get('/car/get-all-cars', carController.handleGetAllCars)
    router.post('/car/create-new-car', carController.handleCreateNewCar)
    router.delete('/car/delete-car', carController.handleDeleteCar)
    router.put('/car/update-car', carController.handleUpdateCar)
    router.get('/car/get-one-car', carController.handleGetCarById)
    router.get('/car/get-bmw-car', carController.handleGetBmwCar)
    router.get('/car/get-ferrari-car', carController.handleGetFerrariCar)
    router.get('/car/get-lamborghini-car', carController.handleGetLamborghiniCar)

    return app.use('/api', router)
}

export default apiRouter;