import { DataTypes, Model } from 'sequelize'
import { ProfileEntity } from '../entities/profile_entity'
import sequelizeInstance from '@infrastructure/configs/sequelize_config'

export default class ProfileModel extends Model<ProfileEntity> implements ProfileEntity {
  id: number
  rol: string
}

ProfileModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
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
