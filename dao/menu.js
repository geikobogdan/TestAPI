const db = require("../db/db");

class MenuDAO {
  async getAll() {
    const items = await db.select("*").from("menu").where({});
    const [{ count }] = await db("menu").count({ count: "*" });
    return { count, items };
  }
  async getByName(name) {
    const [item] = name
      ? await db.select("*").from("menu").where({ name })
      : [{}];

    return item;
  }

  async create(name, ingredients) {
    try {
      const [item] = await db("menu")
        .insert({
          name,
          ingredients,
        })
        .returning("*");
      return item;
    } catch (error) {
      const errors = [];
      if (error.detail.includes("Key (name)")) {
        errors.push({
          msg: "This name is already in use",
          param: "name",
        });
        throw { errors };
      }
    }
  }
  async edit(id, name, ingredients) {
    try {
      let [item] = await db("menu").where({ id });
      if (item) {
        await db("menu")
          .where({ id })
          .update({
            name: name || item.name,
            ingredients: ingredients || item.ingredients,
          });
        [item] = await db("menu").where({ id });
      }
      return item;
    } catch (error) {
      const errors = [];
      if (error.detail.includes("Key (name)")) {
        errors.push({
          msg: "This name is already in use",
          param: "name",
        });
        throw { errors };
      }
    }
  }
  async delete(id) {
    await db("menu").where({ id }).del();
  }
}

module.exports = new MenuDAO();
