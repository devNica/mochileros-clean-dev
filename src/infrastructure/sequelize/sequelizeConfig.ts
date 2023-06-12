import constants from '@shared/constants'
import { Sequelize } from 'sequelize'

const sequelizeOptions = {

  user: constants.DB_USER,
  password: constants.DB_PASSWORD,
  database: constants.DB_NAME,
  options: {
    dialect: constants.DB_DIALECT,
    host: constants.DB_HOST,
    dialectOptions: {
      multipleStatements: true
    },
    logging: false,
    timezone: '-06:00',
    define: {
      freezeTableName: true,
      timestamps: false,
      underscored: true
    }
  }
}

const sequelizeInstance = new Sequelize(sequelizeOptions.database, sequelizeOptions.user, sequelizeOptions.password, sequelizeOptions.options)

export default sequelizeInstance
