import { DataTypes, Model } from 'sequelize'
import { UserProfileEntity } from '../entities/UserProfileEntity'
import sequelizeInstance from '@infrastructure/sequelize/sequelizeConfig'

export interface UserProfileAttrInput extends Required<UserProfileEntity> {}

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
