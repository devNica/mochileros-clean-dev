import { DatabaseAdapterModel } from '@application/ports/database/database'
import sequelizeInstance from '@infrastructure/configs/sequelize_config'
import AccountStatusModel from '@infrastructure/sequelize/models/account_status_model'
import CountryInfoModel from '@infrastructure/sequelize/models/country_info_model'
import PersonalInfoModel from '@infrastructure/sequelize/models/personal_info_model'
import ProfileModel from '@infrastructure/sequelize/models/profile_model'
import UserAccountModel from '@infrastructure/sequelize/models/user_account_model'
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

      /** ACCOUNT STATUS MODEL */
      AccountStatusModel.hasMany(UserAccountModel, { foreignKey: 'fk_status', onUpdate: 'CASCADE', onDelete: 'RESTRICT' })

      /** COUNTRY INFO MODEL */
      CountryInfoModel.hasMany(PersonalInfoModel, { foreignKey: 'fk_country', onUpdate: 'CASCADE', onDelete: 'RESTRICT' })

      /** PERSONAL INFO MODEL */
      PersonalInfoModel.belongsTo(UserAccountModel, { foreignKey: 'fk_user' })
      PersonalInfoModel.belongsTo(CountryInfoModel, { foreignKey: 'fk_country' })

      /** PROFILE MODEL */
      ProfileModel.belongsToMany(UserAccountModel, { through: 'user_profile', foreignKey: 'fk_profile' })

      /** USERMODEL */
      UserAccountModel.hasMany(PersonalInfoModel, { foreignKey: 'fk_user', onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
      UserAccountModel.belongsTo(AccountStatusModel, { foreignKey: 'fk_status' })
      UserAccountModel.belongsToMany(ProfileModel, { through: 'user_profile', foreignKey: 'fk_user' })

      await this.sequelize.sync({ alter })
    } catch (error) {
      console.log(error)
      throw new Error(String(error))
    }
  }
}