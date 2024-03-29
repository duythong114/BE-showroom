import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine'
import initWebRoutes from './routes/web'
require('dotenv').config();

let app = express();

viewEngine(app)

initWebRoutes(app)

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
