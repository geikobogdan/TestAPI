const orderService = require("../services/order");

class OrderController {
  async getAll(req, res) {
    const orders = await orderService.getAll();
    res.status(200).json(orders);
  }
  async getByName(req, res) {
    const { name: orderName } = req.query;
    const order = await orderService.getByName(orderName);
    res.status(200).json(order);
  }
  async getByCustomer(req, res) {
    const customerId = req.params.customerId;
    const orders = await orderService.getByCustomer(customerId);
    res.status(200).json(orders);
  }
  async createOrder(req, res) {
    try {
      const order = await orderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (error) {
      console.error("error: ", error);
      res.status(500).send(error);
    }
  }
  async editOrder(req, res) {
    try {
      const orderId = +req.params.id;
      const order = await orderService.editOrder(
        orderId,
        req.body.order_ids_list
      );
      res.status(200).json(order);
    } catch (error) {
      console.error("error: ", error);
      res.status(500).send(error);
    }
  }
  async delete(req, res) {
    try {
      const orderId = +req.params.id;
      await orderService.delete(orderId);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("error: ", error);
      res.status(500).send(error);
    }
  }
}

module.exports = new OrderController();
