"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var nonSecurePaths = ['/user/logout-user', '/user/login-user', '/user/register', '/user/forgot-password', '/car/get-bmw-car', '/car/get-ferrari-car', '/car/get-lamborghini-car'];
var checkAuthorization = function checkAuthorization(req, res, next) {
  if (nonSecurePaths.includes(req.path) || req.path === '/user/get-user-refresh') return next();
  if (req.user) {
    var _req$user;
    var currentPath = req.path;
    var roles = (_req$user = req.user) === null || _req$user === void 0 ? void 0 : _req$user.roles;
    if (roles) {
      var checkRoles = roles.some(function (item) {
        return item.url === currentPath;
      });
      if (checkRoles) {
        next();
      } else {
        return res.status(403).json({
          errorCode: 3,
          errorMessage: "The user don't have permission",
          data: ''
        });
      }
    } else {
      return res.status(401).json({
        errorCode: 2,
        errorMessage: 'PLease login to continue',
        data: ''
      });
    }
  } else {
    return res.status(401).json({
      errorCode: 1,
      errorMessage: 'PLease login to continue',
      data: ''
    });
  }
};
var _default = exports["default"] = checkAuthorization;