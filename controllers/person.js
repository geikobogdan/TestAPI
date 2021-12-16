const personService = require("../services/person");

class PersonController {
  async getAll(req, res) {
    const persons = await personService.getAll();
    res.status(200).json(persons);
  }
  async getById(req, res) {
    const personId = +req.params.id;
    const person = await personService.getById(personId);
    res.status(200).json(person);
  }
  async createPerson(req, res) {
    try {
      const person = await personService.createPerson(req.body);
      res.status(201).json(person);
    } catch (error) {
      console.error("error: ", error);
      res.status(500).send(error);
    }
  }
  async editPerson(req, res) {
    try {
      const personId = +req.params.id;
      const person = await personService.editPerson(personId, req.body);
      res.status(200).json(person);
    } catch (error) {
      console.error("error: ", error);
      res.status(500).send(error);
    }
  }
  async delete(req, res) {
    try {
      const personId = +req.params.id;
      await personService.deletePerson(personId);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("error: ", error);
      res.status(500).send(error);
    }
  }
}

module.exports = new PersonController();
