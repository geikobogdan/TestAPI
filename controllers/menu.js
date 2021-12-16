const menuService = require("../services/menu");

class MenuController {
  async getAll(req, res) {
    const items = await menuService.getAll();
    res.status(200).json(items);
  }
  async getByName(req, res) {
    const { name: itemName } = req.query;
    const item = await menuService.getByName(itemName);
    res.status(200).json(item);
  }
  async createItem(req, res) {
    try {
      const item = await menuService.createItem(req.body);
      res.status(201).json(item);
    } catch (error) {
      console.error("error: ", error);
      res.status(500).send(error);
    }
  }
  async editItem(req, res) {
    try {
      const itemId = +req.params.id;
      const item = await menuService.editItem(itemId, req.body);
      res.status(200).json(item);
    } catch (error) {
      console.error("error: ", error);
      res.status(500).send(error);
    }
  }
  async delete(req, res) {
    try {
      const itemId = +req.params.id;
      await menuService.delete(itemId);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("error: ", error);
      res.status(500).send(error);
    }
  }
}

module.exports = new MenuController();
