const db = require('../db/db');

class MenuDAO {
  getCount(conditions) {
    if (conditions) {
      // ...
    }

    return db('menu').count();
  }

  getAll() {
    let items = [];
    return db('menu')
      .select('id', 'name', 'ingredients')
      .then((responseItems) => {
        items = responseItems;
        return this.getCount();
      })
      .then((response) => {
        const [{ count }] = response;
        return { count, items };
      });
  }

  getByName(name) {
    return db.table('menu').first('id', 'name', 'ingredients').where({ name });
  }

  async create(name, ingredients) {
    try {
      const [item] = await db('menu')
        .insert({
          name,
          ingredients,
        })
        .returning(['id', 'name', 'ingredients']);
      return item;
    } catch (error) {
      const errors = [];
      if (error.detail.includes('Key (name)')) {
        errors.push({
          msg: 'This name is already in use',
          param: 'name',
        });
        throw { errors };
      }
    }
  }

  async edit(id, name, ingredients) {
    try {
      let item = await db
        .table('menu')
        .first('id', 'name', 'ingredients')
        .where({ id });
      if (item) {
        [item] = await db('menu')
          .where({ id })
          .update({
            name: name || item.name,
            ingredients: ingredients || item.ingredients,
          })
          .returning(['id', 'name', 'ingredients']);
      }
      return item;
    } catch (error) {
      const errors = [];
      if (error.detail.includes('Key (name)')) {
        errors.push({
          msg: 'This name is already in use',
          param: 'name',
        });
        throw { errors };
      }
    }
  }

  delete(id) {
    return db('menu').where({ id }).del();
  }
}

module.exports = new MenuDAO();
