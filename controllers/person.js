const personService = require("../services/person");

class PersonController {
  getAll(req, res) {
    personService.getAll().then((persons) => res.status(200).json(persons));
  }
  getById(req, res) {
    const personId = +req.params.id;
    personService
      .getById(personId)
      .then((person) =>
        person?.id ? res.status(200).json(person) : res.status(404).send()
      );
  }
  createPerson(req, res) {
    personService
      .createPerson(req.body)
      .then((person) => res.status(201).json(person))
      .catch((e) => {
        if (e?.errors && e.errors[0]?.param === "email") {
          return res.status(409).send(e);
        }
        const errorMessage = "An error occurred";
        res.status(500).send({ errorMessage });
      });
  }
  editPerson(req, res) {
    const personId = +req.params.id;
    personService
      .editPerson(personId, req.body)
      .then((person) => res.status(200).json(person))
      .catch((e) => {
        if (e?.errors && e.errors[0]?.param === "email") {
          return res.status(409).send(e);
        }
        const errorMessage = "An error occurred";
        res.status(500).send({ errorMessage });
      });
  }
  delete(req, res) {
    const personId = +req.params.id;
    personService
      .deletePerson(personId)
      .then(() => res.status(200).json({ success: true }))
      .catch((e) => {
        const errorMessage = "An error occurred";
        res.status(500).send({ errorMessage });
      });
  }
}

module.exports = new PersonController();
