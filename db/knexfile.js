module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "knex_tutorial",
      user: "bheiko.appwell",
      password: "1234",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
