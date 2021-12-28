const ApiError = require("../middleware/error/api_error");
const personService = require("../services/person");

class PersonController {
  getAll(req, res) {
    personService.getAll().then((persons) => res.status(200).json(persons));
  }
  getById(req, res) {
    const personId = +req.params.id;
    personService
      .getById(personId)
      .then((person) => res.status(200).json(person));
  }
  createPerson(req, res, next) {
    personService
      .createPerson(req.body)
      .then((person) => res.status(201).json(person))
      .catch((e) => next(ApiError.internal(e)));
  }
  editPerson(req, res, next) {
    const personId = +req.params.id;
    personService
      .editPerson(personId, req.body)
      .then((person) => res.status(200).json(person))
      .catch((e) => next(ApiError.internal(e)));
  }
  delete(req, res, next) {
    const personId = +req.params.id;
    personService
      .deletePerson(personId)
      .then(() => res.status(200).json({ success: true }))
      .catch((e) => next(ApiError.internal(e)));
  }
}

module.exports = new PersonController();
