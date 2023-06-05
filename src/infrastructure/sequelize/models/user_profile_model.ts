import { DataTypes, Model } from 'sequelize'
import { UserProfileEntity } from '../entities/user_profile_entity'
import sequelizeInstance from '@infrastructure/configs/sequelize_config'

export interface UserProfileAttrInput extends Required<UserProfileModel> {}

export default class UserProfileModel extends Model<UserProfileEntity, UserProfileAttrInput> implements UserProfileEntity {
  declare fk_user: string
  declare fk_profile: number
}

UserProfileModel.init({
  fk_user: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'user_account',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  },
  fk_profile: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'profile',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  }
},
{
  sequelize: sequelizeInstance,
  modelName: 'user_profile'
})
