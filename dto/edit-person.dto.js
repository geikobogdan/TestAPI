const { body } = require('express-validator');

const editPersonDto = [
  body('email')
    .optional()
    .isEmail()
    .withMessage('email must contain a valid email address'),
  body('password')
    .optional()
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 chars long'),

  body('role').optional().isIn(['admin', 'user']).withMessage('incorrect role'),
];

module.exports = editPersonDto;
