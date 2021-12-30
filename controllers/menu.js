const ApiError = require('../middleware/error/api_error');
const menuService = require('../services/menu');

class MenuController {
  getAll(req, res) {
    menuService.getAll().then((items) => res.status(200).json(items));
  }

  getByName(req, res) {
    const { name: itemName } = req.query;
    menuService.getByName(itemName).then((item) => res.status(200).json(item));
  }

  createItem(req, res, next) {
    menuService
      .createItem(req.body)
      .then((item) => res.status(201).json(item))
      .catch((e) => next(ApiError.internal(e)));
  }

  editItem(req, res, next) {
    const itemId = +req.params.id;
    menuService
      .editItem(itemId, req.body)
      .then((item) => res.status(200).json(item))
      .catch((e) => next(ApiError.internal(e)));
  }

  delete(req, res, next) {
    const itemId = +req.params.id;
    menuService
      .delete(itemId)
      .then(() => res.status(200).json({ success: true }))
      .catch((e) => next(ApiError.internal(e)));
  }
}

module.exports = new MenuController();
