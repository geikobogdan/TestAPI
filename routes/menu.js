const express = require('express');
const menuController = require('../controllers/menu');
const validateRequest = require('../middleware/validate-request-dto');
const editMenuItemDto = require('../dto/edit-menu-item.dto');
const createMenuItemDto = require('../dto/create-menu-item.dto');

const router = express.Router();

/**
 * @typedef {object} MenuItem
 * @property {number} id - The auto-generated id of the item
 * @property {string} name - name of item
 * @property {array<string>} ingredients - array of ingredients
 */

/**
 * @typedef {object} MenuItemData
 * @property {string} name - name of item
 * @property {array<string>} ingredients - array of ingredients
 */

/**
 * @typedef {object} MenuItemsResponse
 * @property {number} count - count of items
 * @property {array<MenuItem>} menuItems - menuItems array
 */

/**
 * GET /menuItem
 * @summary Get menuItem by name
 * @tags Menu
 * @param {string} name.query.required - Menu name
 * @return {MenuItem} 200 - MenuItem object - application/json
 */
router.get('/?', menuController.getByName);

/**
 * GET /menuItem/all
 * @summary Get menuItems
 * @tags Menu
 * @return {MenuItemsResponse} 200 - count of items and array - application/json
 */
router.get('/all', menuController.getAll);

/**
 * POST /menuItem
 * @summary Create new menuItem
 * @tags Menu
 * @param {MenuItemData} request.body.required - item data
 * @return {MenuItem} 201 - item object
 * @security BearerAuth
 */
router.post('/', createMenuItemDto, validateRequest, menuController.createItem);

/**
 * PATCH /menuItem/{id}
 * @summary Update item by id
 * @tags Menu
 * @param {number} id.path.required - Numeric ID of the item
 * @param {MenuItemData} request.body - item data
 * @return {MenuItem} 200 - updated item object - application/json
 * @security BearerAuth
 */
router.patch('/:id', editMenuItemDto, validateRequest, menuController.editItem);

/**
 * DELETE /menuItem/{id}
 * @summary Delete item by id
 * @tags Menu
 * @param {number} id.path.required - Numeric ID of the item
 * @return {object} 200 - message - application/json
 * @security BearerAuth
 */
router.delete('/:id', menuController.delete);

module.exports = router;
