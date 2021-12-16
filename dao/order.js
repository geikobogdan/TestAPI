const db = require("../db/db");

class OrderDAO {
  async getAll() {
    const orders = await db.select("*").from("order").where({});
    const [{ count }] = await db("order").count({ count: "*" });
    return { count, orders };
  }
  async getOrderItems(orderId) {
    const [res] = await db
      .select("order_ids_list")
      .from("order")
      .where({ id: orderId });
    if (res?.order_ids_list) {
      const items = await db
        .select("*")
        .from("menu")
        .whereIn("id", order_ids_list);
      return items;
    }
    return [];
  }
  async getByName(name) {
    const [order] = name
      ? await db
          .select("*")
          .from("order")
          .leftJoin("person", "person.id", "order.customer")
          .where({ name })
      : [{}];

    if (order && Object.keys(order)?.length) {
      //?
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
  async getByCustomer(id) {
    const orders = await db.select("*").from("order").where({ customer: id });
    const [{ count }] = await db("order")
      .count("customer")
      .where({ customer: id });
    return { count, orders };
  }
  async createOrder(customer, name, order_ids_list) {
    try {
      const [order] = await db("order")
        .insert({
          name,
          customer,
          order_ids_list,
        })
        .returning("*");
      return order;
    } catch (error) {
      const errors = [];
      if (error.detail.includes("Key (name)")) {
        errors.push({
          msg: "This name is already in use",
          param: "name",
        });
        throw { errors };
      }
    }
  }
  async editOrder(id, order_ids_list) {
    let [order] = await db("order").where({ id });
    if (order && order_ids_list) {
      await db("order").where({ id }).update({ order_ids_list });
      [order] = await db("order").where({ id });
    }
    return order;
  }
  async deleteOrder(id) {
    await db("order").where({ id }).del();
  }
}

module.exports = new OrderDAO();
