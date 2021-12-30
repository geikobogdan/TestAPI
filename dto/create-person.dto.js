const { body } = require('express-validator');

const createPersonDto = [
  body('email')
    .isEmail()
    .withMessage('email must contain a valid email address'),
  body('firstName').notEmpty().withMessage('first name must not be empty'),

  body('lastName').notEmpty().withMessage('last name must not be empty'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 chars long'),

  body('role').isIn(['admin', 'user']).withMessage('incorrect role'),
];

module.exports = createPersonDto;
