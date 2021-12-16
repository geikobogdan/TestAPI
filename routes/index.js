const express = require("express");
const personController = require("../controllers/person");
const orderController = require("../controllers/order");
const menuController = require("../controllers/menu");
const createPersonDto = require("../dto/create-person.dto");
const editPersonDto = require("../dto/edit-person.dto");
const validateRequest = require("../middleware/validate-request-dto");
const createOrderDto = require("../dto/create-order.dto");
const editOrderDto = require("../dto/edit-order.dto");
const editMenuItemDto = require("../dto/edit-menu-item.dto");
const createMenuItemDto = require("../dto/create-menu-item.dto");

const router = express.Router();

/**
 * @typedef {object} Person
 * @property {number} id - The auto-generated id of the person
 * @property {string} email - email
 * @property {string} firstName - first name
 * @property {string} lastName - last name
 */

/**
 * @typedef {object} PersonData
 * @property {string} email.required - email
 * @property {string} firstName.required - first name
 * @property {string} lastName.required - last name
 */

/**
 * @typedef {object} PersonsResponse
 * @property {number} count - count of items
 * @property {array<Person>} persons - persons array
 */

/**
 * @typedef {object} Order
 * @property {number} id - The auto-generated id of the order
 * @property {string} name - name of order
 * @property {number} customer - id of customer
 * @property {array<number>} order_ids_list - order items ids array
 */

/**
 * @typedef {object} OrderData
 * @property {string} name - name of order
 * @property {number} customer - id of customer
 * @property {array<number>} order_ids_list - array of menu items ids
 */

/**
 * @typedef {object} OrdersResponse
 * @property {number} count - count of items
 * @property {array<Order>} orders - orders array
 */

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
 * GET /person/{id}
 * @summary Get person by id
 * @tags Person
 * @param {number} id.path.required - Numeric ID of the person to get
 * @return {Person} 200 - Person object - application/json
 */
router.get("/person/:id", personController.getById);

/**
 * GET /person
 * @summary Get all persons
 * @tags Person
 * @return {PersonsResponse} 200 - count of persons and array - application/json
 */
router.get("/person", personController.getAll);

/**
 * POST /person
 * @summary Create new person
 * @tags Person
 * @param {PersonData} request.body.required - Person data
 * @return {Person} 201 - person object
 */
router.post(
  "/person",
  createPersonDto,
  validateRequest,
  personController.createPerson
);

/**
 * PATCH /person/{id}
 * @summary Update person by id
 * @tags Person
 * @param {number} id.path.required - Numeric ID of the person
 * @param {PersonData} request.body - person data
 * @return {Person} 200 - updated person object - application/json
 */
router.patch(
  "/person/:id",
  editPersonDto,
  validateRequest,
  personController.editPerson
);

/**
 * DELETE /person/{id}
 * @summary Delete person by id
 * @tags Person
 * @param {number} id.path.required - Numeric ID of the person
 * @return {object} 200 - message - application/json
 */
router.delete("/person/:id", personController.delete);

//order

/**
 * GET /order
 * @summary Get order by name
 * @tags Order
 * @param {string} name.query.required - Order name
 * @return {Person} 200 - Person object - application/json
 */
router.get("/order?", orderController.getByName);

/**
 * GET /orders/{customerId}
 * @summary Get orders by customerId
 * @tags Order
 * @param {number} customerId.path.required - Numeric ID of the customer to get order
 * @return {OrdersResponse} 200 - count of orders and array - application/json
 */
router.get("/orders/:customerId", orderController.getByCustomer);

/**
 * GET /orders
 * @summary Get orders
 * @tags Order
 * @return {OrdersResponse} 200 - count of orders and array - application/json
 */
router.get("/orders", orderController.getAll);

/**
 * POST /order
 * @summary Create new order
 * @tags Order
 * @param {OrderData} request.body.required - Order data
 * @return {Order} 201 - order object
 */
router.post(
  "/order",
  createOrderDto,
  validateRequest,
  orderController.createOrder
);

/**
 * PATCH /order/{id}
 * @summary Update person by id
 * @tags Person
 * @param {number} id.path.required - Numeric ID of the person
 * @param {PersonData} request.body - person data
 * @return {Person} 200 - updated person object - application/json
 */
router.patch(
  "/order/:id",
  editOrderDto,
  validateRequest,
  orderController.editOrder
);

/**
 * DELETE /order/{id}
 * @summary Delete order by id
 * @tags Order
 * @param {number} id.path.required - Numeric ID of the order
 * @return {object} 200 - message - application/json
 */
router.delete("/order/:id", orderController.delete);

//menu

/**
 * GET /menuItem
 * @summary Get menuItem by name
 * @tags Menu
 * @param {string} name.query.required - Menu name
 * @return {MenuItem} 200 - MenuItem object - application/json
 */
router.get("/menuItem?", menuController.getByName);

/**
 * GET /menuItems
 * @summary Get menuItems
 * @tags Menu
 * @return {MenuItemsResponse} 200 - count of items and array - application/json
 */
router.get("/menuItems", menuController.getAll);

/**
 * POST /menuItem
 * @summary Create new menuItem
 * @tags Menu
 * @param {MenuItemData} request.body.required - item data
 * @return {MenuItem} 201 - item object
 */
router.post(
  "/menuItem",
  createMenuItemDto,
  validateRequest,
  menuController.createItem
);

/**
 * PATCH /menuItem/{id}
 * @summary Update item by id
 * @tags Menu
 * @param {number} id.path.required - Numeric ID of the item
 * @param {MenuItemData} request.body - item data
 * @return {MenuItem} 200 - updated item object - application/json
 */
router.patch(
  "/menuItem/:id",
  editMenuItemDto,
  validateRequest,
  menuController.editItem
);

/**
 * DELETE /menuItem/{id}
 * @summary Delete item by id
 * @tags Menu
 * @param {number} id.path.required - Numeric ID of the item
 * @return {object} 200 - message - application/json
 */
router.delete("/menuItem/:id", menuController.delete);

module.exports = router;
