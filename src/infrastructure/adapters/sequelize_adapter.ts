import { DatabaseAdapterModel } from '@application/ports/database/database'
import sequelizeInstance from '@infrastructure/sequelize/sequelizeConfig'
import AccountStatusModel from '@infrastructure/sequelize/models/AccountStatusModel'
import CountryInfoModel from '@infrastructure/sequelize/models/CountryInfoModel'
import PersonalInfoModel from '@infrastructure/sequelize/models/PersonalInfoModel'
import ProfileModel from '@infrastructure/sequelize/models/ProfileModel'
import UserAccountModel from '@infrastructure/sequelize/models/UserAccountModel'
import UserProfileModel from '@infrastructure/sequelize/models/UserProfileModel'
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
      ProfileModel.hasMany(UserProfileModel, { foreignKey: 'fk_profile', onUpdate: 'CASCADE', onDelete: 'RESTRICT' })

      /** USERMODEL */
      UserAccountModel.hasMany(PersonalInfoModel, { foreignKey: 'fk_user', onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
      UserAccountModel.belongsTo(AccountStatusModel, { foreignKey: 'fk_status' })
      UserAccountModel.belongsToMany(ProfileModel, { through: 'user_profile', foreignKey: 'fk_user', as: 'userHasProfile' })
      UserAccountModel.hasMany(UserProfileModel, { foreignKey: 'fk_user', onUpdate: 'CASCADE', onDelete: 'RESTRICT' })

      UserProfileModel.belongsTo(UserAccountModel, { foreignKey: 'fk_user' })
      UserProfileModel.belongsTo(ProfileModel, { foreignKey: 'fk_profile' })

      await this.sequelize.sync({ alter })
    } catch (error) {
      console.log(error)
      throw new Error(String(error))
    }
  }
}
