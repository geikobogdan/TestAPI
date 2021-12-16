const { body } = require("express-validator");

const editMenuItemDto = [
  body("name").optional().notEmpty().withMessage("name must not be empty"),
  body("ingredients")
    .optional()
    .isArray({ min: 1 })
    .withMessage("ingredients list must not be empty"),
];

module.exports = editMenuItemDto;
