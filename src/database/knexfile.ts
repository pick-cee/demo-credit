import type { Knex } from "knex";
import dotenv from 'dotenv'
dotenv.config({ path: '../../.env' })

const config: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: 'mysql-democredit-akinloluwaolumuyide-democredit.g.aivencloud.com' || process.env.DATABASE_HOST,
    port: 27368 || Number(`${process.env.DATABASE_PORT}`),
    user: 'ravnadminoot' || `${process.env.DATABASE_USERNAME}`,
    password: 'AVNS_dsFT5iGdyfwNsjyUhKV' || `${process.env.DATABASE_PASSWORD}`,
    database: 'defaultdb' || `${process.env.DATABASE_NAME}`,
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
