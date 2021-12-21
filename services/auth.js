const personDAO = require("../dao/person");
const { sign } = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { compare } = require("bcrypt");

class AuthService {
  generateJwt(person) {
    return sign({ id: person.id, email: person.email }, JWT_SECRET);
  }
  async login(payload) {
    const person = await personDAO.getByEmail(payload.email);
    if (person) {
      const isPasswordCorrect = await compare(
        payload.password,
        person.password
      );
      if (isPasswordCorrect) {
        delete person.password;
        return { ...person, token: this.generateJwt(person) };
      }
    }
    const errors = [];
    errors.push({
      msg: "Invalid credentials",
      param: "login",
    });
    throw { errors };
  }
}

module.exports = new AuthService();
