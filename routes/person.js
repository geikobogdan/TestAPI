const express = require('express');
const personController = require('../controllers/person');
const createPersonDto = require('../dto/create-person.dto');
const editPersonDto = require('../dto/edit-person.dto');
const validateRequest = require('../middleware/validate-request-dto');

const router = express.Router();

/**
 * @typedef {object} Person
 * @property {number} id - The auto-generated id of the person
 * @property {string} role - role
 * @property {string} email - email
 * @property {string} firstName - first name
 * @property {string} lastName - last name
 */

/**
 * @typedef {object} PersonData
 * @property {string} email.required - email
 * @property {string} role.required - role "admin" || "user"
 * @property {string} firstName.required - first name
 * @property {string} lastName.required - last name
 * @property {string} password.required - password
 */

/**
 * @typedef {object} PersonsResponse
 * @property {number} count - count of items
 * @property {array<Person>} persons - persons array
 */

/**
 * GET /person/{id}
 * @summary Get person by id
 * @tags Person
 * @param {number} id.path.required - Numeric ID of the person to get
 * @return {Person} 200 - Person object - application/json
 */
router.get('/:id', personController.getById);

/**
 * GET /person
 * @summary Get all persons
 * @tags Person
 * @return {PersonsResponse} 200 - count of persons and array - application/json
 */
router.get('/', personController.getAll);

/**
 * POST /person
 * @summary Create new person
 * @tags Person
 * @param {PersonData} request.body.required - Person data
 * @return {Person} 201 - person object
 * @security BearerAuth
 */
router.post(
  '/',
  createPersonDto,
  validateRequest,
  personController.createPerson,
);

/**
 * PATCH /person/{id}
 * @summary Update person by id
 * @tags Person
 * @param {number} id.path.required - Numeric ID of the person
 * @param {PersonData} request.body - person data
 * @return {Person} 200 - updated person object - application/json
 * @security BearerAuth
 */
router.patch(
  '/:id',
  editPersonDto,
  validateRequest,
  personController.editPerson,
);

/**
 * DELETE /person/{id}
 * @summary Delete person by id
 * @tags Person
 * @param {number} id.path.required - Numeric ID of the person
 * @return {object} 200 - message - application/json
 * @security BearerAuth
 */
router.delete('/:id', personController.delete);

module.exports = router;
