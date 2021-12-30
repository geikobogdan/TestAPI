const ApiError = require('../middleware/error/api_error');
const authService = require('../services/auth');

class AuthController {
  login(req, res, next) {
    authService
      .login(req.body)
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((e) => next(ApiError.internal(e)));
  }
}

module.exports = new AuthController();
