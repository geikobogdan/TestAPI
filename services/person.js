const personDAO = require("../dao/person");

class PersonService {
  getAll() {
    return personDAO.getAll();
  }
  getById(id) {
    return personDAO.getById(id);
  }
  createPerson(personDto) {
    const { firstName, lastName, email, password } = personDto;
    return personDAO.createPerson(firstName, lastName, email, password);
  }
  editPerson(id, personDto) {
    const { firstName, lastName, email, password } = personDto;
    return personDAO.editPerson(id, firstName, lastName, email, password);
  }
  deletePerson(id) {
    return personDAO.deletePerson(id);
  }
}

module.exports = new PersonService();
