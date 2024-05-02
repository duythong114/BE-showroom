"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _homeController = _interopRequireDefault(require("../controllers/homeController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import { getHomePage } from '../controller/homeController';

var router = _express["default"].Router();
var initWebRoutes = function initWebRoutes(app) {
  router.get('/', _homeController["default"].getHomePage);
  router.get('/create-user', _homeController["default"].getCreateUserPage);
  router.post('/post-user', _homeController["default"].postNewUser);
  router.get('/delete-user', _homeController["default"].deleteUser);
  router.get('/edit-user', _homeController["default"].getEditUserPage);
  router.post('/put-user', _homeController["default"].editUser);
  return app.use("/", router);
};
var _default = exports["default"] = initWebRoutes;