import { DataTypes, Model, NOW } from 'sequelize'
import { UserEntity } from '../entities/user_entity'
import sequelizeInstance from '@infrastructure/configs/sequelize_config'

export default class UserModel extends Model<UserEntity> implements UserEntity {
  id: string
  email: string
  password: string
  phoneNumber: string
  status: boolean
  createdAt: string
  updatedAt: string
}

UserModel.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.TINYINT,
    defaultValue: true,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: NOW()
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
},
{
  sequelize: sequelizeInstance,
  modelName: 'user'
})
