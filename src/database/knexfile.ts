import type { Knex } from "knex";
import dotenv from 'dotenv'
dotenv.config()
// Update with your config settings.

const config: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: `${process.env.DATABASE_HOST}`,
    port: Number(`${process.env.DATABASE_PORT}`),
    user: `${process.env.DATABASE_USERNAME}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
  },
  pool: {
    max: 5,
    min: 0,
  },
  migrations: {
    directory: ['./migrations']
  }
};

export default config
