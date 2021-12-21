const menuService = require("../services/menu");

class MenuController {
  getAll(req, res) {
    menuService.getAll().then((items) => res.status(200).json(items));
  }
  getByName(req, res) {
    const { name: itemName } = req.query;
    menuService
      .getByName(itemName)
      .then((item) =>
        item?.id ? res.status(200).json(item) : res.status(404).send()
      );
  }
  createItem(req, res) {
    menuService
      .createItem(req.body)
      .then((item) => res.status(201).json(item))
      .catch((e) => {
        if (e?.errors && e.errors[0]?.param === "name") {
          return res.status(409).send(e);
        }
        const errorMessage = "An error occurred";
        res.status(500).send({ errorMessage });
      });
  }
  editItem(req, res) {
    const itemId = +req.params.id;
    menuService
      .editItem(itemId, req.body)
      .then((item) => res.status(200).json(item))
      .catch((e) => {
        if (e?.errors && e.errors[0]?.param === "name") {
          return res.status(409).send(e);
        }
        const errorMessage = "An error occurred";
        res.status(500).send({ errorMessage });
      });
  }
  delete(req, res) {
    const itemId = +req.params.id;
    menuService
      .delete(itemId)
      .then(() => res.status(200).json({ success: true }))
      .catch((e) => {
        const errorMessage = "An error occurred";
        res.status(500).send({ errorMessage });
      });
  }
}

module.exports = new MenuController();
