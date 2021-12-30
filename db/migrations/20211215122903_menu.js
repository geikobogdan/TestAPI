exports.up = function (knex) {
  return knex.schema.createTable('menu', (table) => {
    table.increments('id');
    table.string('name').notNullable().unique();
    table.specificType('ingredients', 'text ARRAY');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('menu');
};
