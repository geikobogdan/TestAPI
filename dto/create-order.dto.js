const { body } = require('express-validator');

const createOrderDto = [
  body('name').notEmpty().withMessage('name must not be empty'),
  body('order_ids_list')
    .isArray({ min: 1 })
    .withMessage('order list must not be empty'),
];

module.exports = createOrderDto;
