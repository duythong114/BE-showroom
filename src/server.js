import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import apiRouter from './routes/api';
import morgan from 'morgan';
import connectDB from './config/connectDB'
import configCors from './config/cors'
import cookieParser from 'cookie-parser'

require('dotenv').config();

let app = express();

// view engine
viewEngine(app)

// body-parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cookie-parser
app.use(cookieParser())

// FIX CORS
configCors(app)

// check connect database
connectDB();

// init routes
initWebRoutes(app)

// api routes
apiRouter(app)

// HTTP logger 
app.use(morgan('combined'))

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
