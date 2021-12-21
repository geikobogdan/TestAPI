const { verify } = require("jsonwebtoken");
const personService = require("../services/person");
const { JWT_SECRET } = require("../config");

const authMiddleware = (req, res, next) => {
  const errors = [];

  if (!req.headers.authorization) {
    errors.push({
      msg: "You are not authorized",
      param: "auth",
    });
    return res.status(401).json(errors);
  }

  const token = req.headers.authorization.split(" ")[1];
  let decode = {};
  try {
    decode = verify(token, JWT_SECRET);
  } catch (e) {
    errors.push({
      msg: "You are not authorized",
      param: "auth",
    });
    return res.status(401).json(errors);
  }
  personService
    .getById(decode?.id)
    .then((person) => {
      if (person?.id) {
        req.user = person;
        return next();
      }
      errors.push({
        msg: "You are not authorized",
        param: "auth",
      });
      return res.status(401).json(errors);
    })
    .catch((e) => {
      const errorMessage = "An error occurred";
      return res.status(500).send({ errorMessage });
    });
};
module.exports = authMiddleware;
