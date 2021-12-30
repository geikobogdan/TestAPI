const express = require('express');
const orderController = require('../controllers/order');
const validateRequest = require('../middleware/validate-request-dto');
const createOrderDto = require('../dto/create-order.dto');
const editOrderDto = require('../dto/edit-order.dto');

const router = express.Router();

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
 * GET /order
 * @summary Get order by name
 * @tags Order
 * @param {string} name.query.required - Order name
 * @return {Person} 200 - Person object - application/json
 */
router.get('/?', orderController.getByName);

/**
 * GET /order/all/{customerId}
 * @summary Get orders by customerId
 * @tags Order
 * @param {number} customerId.path.required - Numeric ID of the customer to get order
 * @return {OrdersResponse} 200 - count of orders and array - application/json
 */
router.get('/all/:customerId', orderController.getByCustomer);

/**
 * GET /order/all
 * @summary Get orders
 * @tags Order
 * @return {OrdersResponse} 200 - count of orders and array - application/json
 */
router.get('/all', orderController.getAll);

/**
 * POST /order
 * @summary Create new order
 * @tags Order
 * @param {OrderData} request.body.required - Order data
 * @return {Order} 201 - order object
 * @security BearerAuth
 */
router.post('/', createOrderDto, validateRequest, orderController.createOrder);

/**
 * PATCH /order/{id}
 * @summary Update order by id
 * @tags Order
 * @param {number} id.path.required - Numeric ID of the order
 * @param {OrderData} request.body - order data
 * @return {Order} 200 - updated order object - application/json
 * @security BearerAuth
 */
router.patch('/:id', editOrderDto, validateRequest, orderController.editOrder);

/**
 * DELETE /order/{id}
 * @summary Delete order by id
 * @tags Order
 * @param {number} id.path.required - Numeric ID of the order
 * @return {object} 200 - message - application/json
 * @security BearerAuth
 */
router.delete('/:id', orderController.delete);

module.exports = router;
