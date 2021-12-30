const express = require('express');
const authController = require('../controllers/auth');
const validateRequest = require('../middleware/validate-request-dto');
const loginPayloadDto = require('../dto/login-dto');

const router = express.Router();

/**
 * @typedef {object} LoginData
 * @property {string} email.required - email
 * @property {string} password.required - password
 */

/**
 * @typedef {object} LoginResponse
 * @property {number} id - The auto-generated id of the person
 * @property {string} role - role
 * @property {string} email - email
 * @property {string} firstName - first name
 * @property {string} lastName - last name
 * @property {string} token - token
 */

/**
 * POST /auth/login
 * @summary log in
 * @tags Auth
 * @param {LoginData} request.body.required - login payload
 * @return {LoginResponse} 200 - login response - application/json
 */
router.post('/login', loginPayloadDto, validateRequest, authController.login);

module.exports = router;
