import knex from "knex";

const knexInstance = knex({
  client: "pg",
  connection: "postgres://postgres:password@localhost:5432/db"
});

export default knexInstance;
