const orderDAO = require('../dao/order');

class OrderService {
  getAll() {
    return orderDAO.getAll();
  }

  getByName(name) {
    return orderDAO.getByName(name);
  }

  getByCustomer(id) {
    return orderDAO.getByCustomer(id);
  }

  createOrder(createOrderDto) {
    const { customer, name, order_ids_list } = createOrderDto;
    return orderDAO.createOrder(+customer, name, order_ids_list);
  }

  editOrder(id, order_ids_list) {
    return orderDAO.editOrder(id, order_ids_list);
  }

  delete(id) {
    return orderDAO.deleteOrder(id);
  }
}

module.exports = new OrderService();
