import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import apiRouter from './routes/api';
import methodOverride from 'method-override';
import morgan from 'morgan';

require('dotenv').config();

let app = express();

// FIX CORS
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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
