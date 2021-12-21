const authService = require("../services/auth");

class AuthController {
  login(req, res) {
    authService
      .login(req.body)
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((e) => {
        if (e?.errors && e.errors[0]?.param === "login") {
          return res.status(401).send(e);
        }
        const errorMessage = "An error occurred";
        res.status(500).send({ errorMessage });
      });
  }
}

module.exports = new AuthController();
