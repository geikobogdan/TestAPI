const { hash } = require('bcrypt');
const db = require('../db/db');

class PersonDAO {
  getAll() {
    return db('person')
      .select(
        'id',
        'role',
        'first_name as firstName',
        'last_name as lastName',
        'email',
      )
      .then((persons) => ({ count: persons.length, persons }));
  }

  getById(id) {
    return db
      .table('person')
      .first(
        'id',
        'role',
        'first_name as firstName',
        'last_name as lastName',
        'email',
      )
      .where({ id });
  }

  getByEmail(email) {
    return db
      .table('person')
      .first(
        'id',
        'role',
        'first_name as firstName',
        'last_name as lastName',
        'email',
        'password',
      )
      .where({ email });
  }

  async createPerson(firstName, lastName, email, password, role) {
    try {
      const hashedPassword = await hash(password, 10);
      const [id] = await db('person')
        .insert({
          email,
          first_name: firstName,
          last_name: lastName,
          password: hashedPassword,
          role,
        })
        .returning('id');
      return {
        id,
        role,
        email,
        firstName,
        lastName,
      };
    } catch (error) {
      const errors = [];
      if (error.detail.includes('Key (email)')) {
        errors.push({
          msg: 'This mail is already in use',
          param: 'email',
        });
        throw { errors };
      }
    }
  }

  async editPerson(id, firstName, lastName, email, password, role) {
    try {
      const hashedPassword = password ? await hash(password, 10) : '';
      let person = await db
        .table('person')
        .first('id', 'role', 'first_name', 'last_name', 'email')
        .where({ id });
      if (person) {
        [person] = await db('person')
          .where({ id })
          .update({
            email: email || person.email,
            first_name: firstName || person.firstName,
            last_name: lastName || person.lastName,
            password: hashedPassword || person.password,
            role: role || person.role,
          })
          .returning([
            'id',
            'role',
            'first_name as firstName',
            'last_name as lastName',
            'email',
          ]);
      }
      return person;
    } catch (error) {
      const errors = [];
      if (error.detail.includes('Key (email)')) {
        errors.push({
          msg: 'This mail is already in use',
          param: 'email',
        });
        throw { errors };
      }
    }
  }

  deletePerson(id) {
    return db('person').where({ id }).del();
  }
}

module.exports = new PersonDAO();
