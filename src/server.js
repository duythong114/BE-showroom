import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import apiRouter from './routes/api';
import methodOverride from 'method-override';
import morgan from 'morgan';
import connectDB from './config/connectDB'
import configCors from './config/cors'

require('dotenv').config();

let app = express();

// check connect database
connectDB();

// FIX CORS
configCors(app)

// body-parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// express method-override
app.use(methodOverride('_method'))

// view engine
viewEngine(app)

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
