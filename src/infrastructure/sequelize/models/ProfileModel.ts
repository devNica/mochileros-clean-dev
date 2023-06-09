import { DataTypes, Model } from 'sequelize'
import { ProfileEntity } from '../entities/ProfileEntity'
import sequelizeInstance from '@infrastructure/sequelize/sequelizeConfig'

export interface ProfileAttrInput extends Required<ProfileEntity> {}

export default class ProfileModel extends Model<ProfileEntity, ProfileAttrInput> implements ProfileEntity {
  id: number
  rol: string
}

ProfileModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  rol: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  }
},
{
  sequelize: sequelizeInstance,
  modelName: 'profile'
})
