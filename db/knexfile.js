const {
  CLIENT, DB_MANE, USER, PASSWORD,
} = require('../config');

module.exports = {
  development: {
    client: CLIENT,
    connection: {
      database: DB_MANE,
      user: USER,
      password: PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};
