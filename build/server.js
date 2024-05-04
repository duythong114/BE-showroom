"use strict";

var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _viewEngine = _interopRequireDefault(require("./config/viewEngine"));
var _web = _interopRequireDefault(require("./routes/web"));
var _api = _interopRequireDefault(require("./routes/api"));
var _morgan = _interopRequireDefault(require("morgan"));
var _connectDB = _interopRequireDefault(require("./config/connectDB"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
require('dotenv').config();
var app = (0, _express["default"])();

// FIX CORS
app.use((0, _cors["default"])({
  origin: process.env.REACT_URL,
  credentials: true
}));

// view engine
(0, _viewEngine["default"])(app);

// body-parser 
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));

// cookie-parser
app.use((0, _cookieParser["default"])());

// check connect database
(0, _connectDB["default"])();

// init routes
(0, _web["default"])(app);

// api routes
(0, _api["default"])(app);

// HTTP logger 
app.use((0, _morgan["default"])('combined'));
var port = process.env.PORT || 6969;
app.listen(port, function () {
  console.log("App listening at http://localhost:".concat(port));
});