const orderService = require("../services/order");

class OrderController {
  getAll(req, res) {
    orderService.getAll().then((orders) => res.status(200).json(orders));
  }
  getByName(req, res) {
    const { name: orderName } = req.query;

    orderService.getByName(orderName).then((order) => {
      return order?.id ? res.status(200).json(order) : res.status(404).send();
    });
  }
  getByCustomer(req, res) {
    const customerId = +req.params.customerId;
    orderService
      .getByCustomer(customerId)
      .then((orders) => res.status(200).json(orders));
  }
  async createOrder(req, res) {
    try {
      const order = await orderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (e) {
      if (e?.errors && e.errors[0]?.param === "name") {
        return res.status(409).send(e);
      }
      const errorMessage = "An error occurred";
      res.status(500).send({ errorMessage });
    }
  }
  editOrder(req, res) {
    const orderId = +req.params.id;
    orderService
      .editOrder(orderId, req.body.order_ids_list)
      .then((order) => res.status(200).json(order))
      .catch((e) => {
        if (e?.errors && e.errors[0]?.param === "name") {
          return res.status(409).send(e);
        }
        const errorMessage = "An error occurred";
        res.status(500).send({ errorMessage });
      });
  }
  delete(req, res) {
    const orderId = +req.params.id;
    orderService
      .delete(orderId)
      .then(() => res.status(200).json({ success: true }))
      .catch((e) => {
        const errorMessage = "An error occurred";
        res.status(500).send({ errorMessage });
      });
  }
}

module.exports = new OrderController();
