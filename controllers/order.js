const ApiError = require("../middleware/error/api_error");
const orderService = require("../services/order");

class OrderController {
  getAll(req, res) {
    orderService.getAll().then((orders) => res.status(200).json(orders));
  }
  getByName(req, res) {
    const { name: orderName } = req.query;

    orderService.getByName(orderName).then((order) => {
      return res.status(200).json(order);
    });
  }
  getByCustomer(req, res) {
    const customerId = +req.params.customerId;
    orderService
      .getByCustomer(customerId)
      .then((orders) => res.status(200).json(orders));
  }
  async createOrder(req, res, next) {
    try {
      const order = await orderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (e) {
      next(ApiError.internal(e));
    }
  }
  editOrder(req, res, next) {
    const orderId = +req.params.id;
    orderService
      .editOrder(orderId, req.body.order_ids_list)
      .then((order) => res.status(200).json(order))
      .catch((e) => next(ApiError.internal(e)));
  }
  delete(req, res, next) {
    const orderId = +req.params.id;
    orderService
      .delete(orderId)
      .then(() => res.status(200).json({ success: true }))
      .catch((e) => next(ApiError.internal(e)));
  }
}

module.exports = new OrderController();
