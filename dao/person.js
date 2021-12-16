const db = require("../db/db");

class PersonDAO {
  async getAll() {
    const persons = await db.select("*").from("person").where({});
    const [{ count }] = await db("person").count({ count: "*" });
    return { count, persons };
  }
  async getById(id) {
    const [person] = await db.select("*").from("person").where({ id });
    return person;
  }
  async createPerson(firstName, lastName, email) {
    try {
      const [person] = await db("person")
        .insert({
          email,
          first_name: firstName,
          last_name: lastName,
        })
        .returning("*");
      return person;
    } catch (error) {
      const errors = [];
      if (error.detail.includes("Key (email)")) {
        errors.push({
          msg: "This mail is already in use",
          param: "email",
        });
        throw { errors };
      }
    }
  }
  async editPerson(id, firstName, lastName, email) {
    try {
      let [person] = await db("person").where({ id });
      if (person) {
        await db("person")
          .where({ id })
          .update({
            email: email ? email : person.email,
            first_name: firstName ? firstName : person.firstName,
            last_name: lastName ? lastName : person.lastName,
          });
        [person] = await db("person").where({ id });
      }
      return person;
    } catch (error) {
      const errors = [];
      if (error.detail.includes("Key (email)")) {
        errors.push({
          msg: "This mail is already in use",
          param: "email",
        });
        throw { errors };
      }
    }
  }
  async deletePerson(id) {
    await db("person").where({ id }).del();
  }
}

module.exports = new PersonDAO();
