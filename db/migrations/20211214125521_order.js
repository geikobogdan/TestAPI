exports.up = function (knex) {
  return knex.schema.createTable("order", (table) => {
    table.increments("id");
    table.integer("customer").unsigned().notNullable();
    table.string("name").notNullable().unique();
    table.timestamps(true, true);
    table
      .foreign("customer")
      .references("id")
      .inTable("person")
      .onDelete("cascade");
    table.specificType("order_ids_list", "integer ARRAY");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("order");
};
