import { DatabaseAdapterModel } from '@application/ports/database/database'
import sequelizeInstance from '@infrastructure/configs/sequelize_config'
import PersonalInfoModel from '@infrastructure/sequelize/models/personal_info_model'
import UserModel from '@infrastructure/sequelize/models/user_model'
import { Sequelize } from 'sequelize'

export class SequelizeDatabaseAdapter implements DatabaseAdapterModel {
  private readonly sequelize: Sequelize
  constructor () {
    this.sequelize = sequelizeInstance
  }

  async connect (): Promise<void> {
    try {
      await this.sequelize.authenticate()
    } catch (error) {
      throw new Error('Database connection failed')
    }
  }

  async syncModels (alter: boolean): Promise<void> {
    try {
      // ASSOCIATIONS

      /** PERSONAL INFO MODEL */
      PersonalInfoModel.belongsTo(UserModel, { foreignKey: 'fkUser' })

      /** USERMODEL */
      UserModel.hasMany(PersonalInfoModel, { foreignKey: 'fkUser', onUpdate: 'CASCADE', onDelete: 'RESTRICT' })

      await this.sequelize.sync({ alter })
    } catch (error) {
      throw new Error('error synchronizing models')
    }
  }
}
