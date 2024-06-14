import type { Knex } from "knex";
import dotenv from 'dotenv'
dotenv.config()
// Update with your config settings.

const config: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: `root` || `${process.env.DATABASE_USER}`,
    password: 'password' || process.env.DATABASE_PASSWORD,
    database: 'lendsqr' || `${process.env.DATABASE_NAME}`,
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
