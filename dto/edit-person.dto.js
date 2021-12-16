const { body } = require("express-validator");

const editPersonDto = [
  body("email")
    .optional()
    .isEmail()
    .withMessage("email must contain a valid email address"),
];

module.exports = editPersonDto;
