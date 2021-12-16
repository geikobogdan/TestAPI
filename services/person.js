const personDAO = require("../dao/person");

class PersonService {
  getAll() {
    return personDAO.getAll();
  }
  getById(id) {
    return personDAO.getById(id);
  }
  createPerson(personDto) {
    const { firstName, lastName, email } = personDto;
    return personDAO.createPerson(firstName, lastName, email);
  }
  editPerson(id, personDto) {
    const { firstName, lastName, email } = personDto;
    return personDAO.editPerson(id, firstName, lastName, email);
  }
  deletePerson(id) {
    return personDAO.deletePerson(id);
  }
}

module.exports = new PersonService();
