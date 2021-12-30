const { body } = require('express-validator');

const createMenuItemDto = [
  body('name').notEmpty().withMessage('name must not be empty'),
  body('ingredients')
    .isArray({ min: 1 })
    .withMessage('ingredients list must not be empty'),
];

module.exports = createMenuItemDto;
