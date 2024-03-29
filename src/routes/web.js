import express from 'express';
// import { getHomePage } from '../controller/homeController';
import homeController from '../controllers/homeController';

const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage)

    return app.use("/", router);
}

export default initWebRoutes;