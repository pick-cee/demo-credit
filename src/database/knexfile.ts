import type { Knex } from "knex";
import dotenv from 'dotenv'
dotenv.config()
// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
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
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

export default config
