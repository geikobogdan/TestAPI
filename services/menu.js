const menuDAO = require('../dao/menu');

class MenuService {
  getAll() {
    return menuDAO.getAll();
  }

  getByName(name) {
    return menuDAO.getByName(name);
  }

  createItem(createItemDto) {
    const { name, ingredients } = createItemDto;
    return menuDAO.create(name, ingredients);
  }

  editItem(id, editItemDto) {
    const { name, ingredients } = editItemDto;
    return menuDAO.edit(id, name, ingredients);
  }

  delete(id) {
    return menuDAO.delete(id);
  }
}

module.exports = new MenuService();
