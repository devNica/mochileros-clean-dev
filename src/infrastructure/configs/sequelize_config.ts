import constants from '@shared/constants'
import { Sequelize } from 'sequelize'

const db = (function setupDB () {
  return {
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
}())

const sequelizeInstance = new Sequelize(db.database, db.user, db.password, db.options)

export default sequelizeInstance
