const db = require('../db/db');

class OrderDAO {
  getAll() {
    return db('order')
      .select('id', 'name', 'order_ids_list', 'customer')
      .then((orders) => ({ count: orders.length, orders }));
  }

  async getOrderItems(orderId) {
    const res = await db
      .table('order')
      .first('order_ids_list')
      .where({ id: orderId });

    if (res?.order_ids_list) {
      const items = await db('menu')
        .select('id', 'name', 'ingredients')
        .whereIn('id', res.order_ids_list);
      return items;
    }
    return [];
  }

  async getByName(name) {
    const order = name
      ? await db
        .table('order as o')
        .first(
          'o.id',
          'o.name',
          'o.order_ids_list',
          'o.customer',
          'p.first_name',
          'p.last_name',
          'p.email',
        )
        .leftJoin('person as p', 'p.id', 'o.customer')
        .where({ name })
      : {};
    if (order && Object.keys(order)?.length) {
      // ?
      order.person = {
        id: order.customer,
        first_name: order.first_name,
        last_name: order.last_name,
        email: order.email,
      };

      order.orderItems = await this.getOrderItems(order.id);
      delete order.first_name;
      delete order.last_name;
      delete order.email;
    }
    return order;
  }

  getByCustomer(id) {
    return db('order')
      .select('id', 'name', 'order_ids_list')
      .where({ customer: id })
      .then((orders) => ({ count: orders.length, orders }));
  }

  async createOrder(customer, name, order_ids_list) {
    try {
      const [order] = await db('order')
        .insert({ name, customer, order_ids_list })
        .returning(['id', 'name', 'customer', 'order_ids_list']);
      return order;
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

  async editOrder(id, order_ids_list) {
    let [order] = await db('order').where({ id });
    if (order && order_ids_list) {
      await db('order').where({ id }).update({ order_ids_list });
      [order] = await db('order').where({ id });
    }
    return order;
  }

  deleteOrder(id) {
    return db('order').where({ id }).del();
  }
}

module.exports = new OrderDAO();
