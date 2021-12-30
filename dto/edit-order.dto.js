const { body } = require('express-validator');

const editOrderDto = [
  body('order_ids_list')
    .optional()
    .isArray({ min: 1 })
    .withMessage('order list must not be empty'),
];

module.exports = editOrderDto;
