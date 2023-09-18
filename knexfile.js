// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: "postgres://postgres:password@localhost:5432/db",
    migrations: {
      directory: "./src/database/migrations",
    },
  },
};
