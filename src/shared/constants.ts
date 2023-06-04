import 'dotenv/config'

export default {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  SERVER_PORT: process.env.SERVER_PORT ?? 8900,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_DIALECT: process.env.DB_DIALECT,
  SEQUELIZE_CONFIG_ALTER: process.env.SEQUELIZE_CONFIG_ALTER ?? true
}
