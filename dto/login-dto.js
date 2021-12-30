const { body } = require('express-validator');

const loginPayloadDto = [
  body('email')
    .isEmail()
    .withMessage('email must contain a valid email address'),
  body('password').notEmpty().withMessage('password must not be empty'),
];

module.exports = loginPayloadDto;
