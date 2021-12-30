const { sign } = require('jsonwebtoken');
const { compare } = require('bcrypt');
const personDAO = require('../dao/person');
const { JWT_SECRET } = require('../config');

class AuthService {
  generateJwt(person) {
    return sign({ id: person.id, email: person.email }, JWT_SECRET);
  }

  async login(payload) {
    const person = await personDAO.getByEmail(payload.email);
    if (person) {
      const isPasswordCorrect = await compare(
        payload.password,
        person.password,
      );
      if (isPasswordCorrect) {
        delete person.password;
        return { ...person, token: this.generateJwt(person) };
      }
    }
    const errors = [];
    errors.push({
      msg: 'Invalid credentials',
      param: 'login',
    });
    const errorsObj = { errors };
    throw errorsObj;
  }
}

module.exports = new AuthService();
