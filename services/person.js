const personDAO = require("../dao/person");

class PersonService {
  getAll() {
    return personDAO.getAll();
  }
  getById(id) {
    return personDAO.getById(id);
  }
  createPerson(personDto) {
    const { firstName, lastName, email, password, role } = personDto;
    return personDAO.createPerson(firstName, lastName, email, password, role);
  }
  editPerson(id, personDto) {
    const { firstName, lastName, email, password, role } = personDto;
    return personDAO.editPerson(id, firstName, lastName, email, password, role);
  }
  deletePerson(id) {
    return personDAO.deletePerson(id);
  }
}

module.exports = new PersonService();
