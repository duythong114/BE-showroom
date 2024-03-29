import express from 'express';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', (req, res) => {
        res.send("HI DUY THONG")
    })

    return app.use("/", router);
}

module.exports = initWebRoutes;