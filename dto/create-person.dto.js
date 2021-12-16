const { body } = require("express-validator");

const createPersonDto = [
  body("email")
    .isEmail()
    .withMessage("email must contain a valid email address"),
  body("firstName").notEmpty().withMessage("first name must not be empty"),

  body("lastName").notEmpty().withMessage("last name must not be empty"),
];

module.exports = createPersonDto;
