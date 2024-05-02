"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = _interopRequireDefault(require("../controllers/userController"));
var _checkAccessToken = _interopRequireDefault(require("../middlewares/checkAccessToken"));
var _checkAuthorization = _interopRequireDefault(require("../middlewares/checkAuthorization"));
var _carController = _interopRequireDefault(require("../controllers/carController"));
var _bookingController = _interopRequireDefault(require("../controllers/bookingController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var apiRouter = function apiRouter(app) {
  // middlewares
  router.all('*', _checkAccessToken["default"], _checkAuthorization["default"]);

  // user api
  router.get('/user/get-user-refresh', _userController["default"].handleGetUserRefresh);
  router.post('/user/login-user', _userController["default"].handleLoginUser);
  router.get('/user/logout-user', _userController["default"].handleLogoutUser);
  router.post('/user/register', _userController["default"].handleRegisterUser);
  router.get('/user/get-all-users', _userController["default"].handleGetAllUsers);
  router.get('/user/get-one-user', _userController["default"].handleGetUserById);
  router.post('/user/create-user', _userController["default"].handleCreateUser);
  router["delete"]('/user/delete-user', _userController["default"].handleDeleteUser);
  router.put('/user/update-user', _userController["default"].handleUpdateUser);
  router.put('/user/update-personal-user', _userController["default"].handleUpdatePersonalUser);
  router.put('/user/change-password', _userController["default"].handleChangePassword);
  router.put('/user/forgot-password', _userController["default"].handleForgotPassword);

  // car api
  router.get('/car/get-all-cars', _carController["default"].handleGetAllCars);
  router.post('/car/create-new-car', _carController["default"].handleCreateNewCar);
  router["delete"]('/car/delete-car', _carController["default"].handleDeleteCar);
  router.put('/car/update-car', _carController["default"].handleUpdateCar);
  router.get('/car/get-one-car', _carController["default"].handleGetCarById);
  router.get('/car/get-bmw-car', _carController["default"].handleGetBmwCar);
  router.get('/car/get-ferrari-car', _carController["default"].handleGetFerrariCar);
  router.get('/car/get-lamborghini-car', _carController["default"].handleGetLamborghiniCar);

  // booking api
  router.get('/booking/get-process-bookings', _bookingController["default"].handleGetProcessBookings);
  router.post('/booking/create-new-booking', _bookingController["default"].handleCreateNewBooking);
  router["delete"]('/booking/delete-booking', _bookingController["default"].handleDeleteBooking);
  router.put('/booking/update-booking', _bookingController["default"].handleUpdateBooking);
  router.get('/booking/get-one-booking', _bookingController["default"].handleGetBookingByUserId);
  router.put('/booking/cancel-booking', _bookingController["default"].handleCancelBooking);
  return app.use('/api', router);
};
var _default = exports["default"] = apiRouter;