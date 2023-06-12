import { DataTypes, Model, NOW, Optional } from 'sequelize'
import { UserAccountEntity } from '../entities/UserAccountEntity'
import sequelizeInstance from '@infrastructure/sequelize/sequelizeConfig'

export interface UserAttrInput extends Optional<UserAccountEntity, 'id' | 'twoFactorAuth' | 'createdAt' | 'updatedAt'> {}
export interface UserAttrOutput extends Required<UserAccountEntity> {}

export default class UserAccountModel extends Model<UserAccountEntity, UserAttrInput> implements UserAccountEntity {
  declare id: string
  declare email: string
  declare password: string
  declare phoneNumber: string
  declare isRoot: boolean
  declare twoFactorAuth: boolean
  declare fk_status: number
  declare createdAt: string
  declare updatedAt: string
}

UserAccountModel.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
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
  twoFactorAuth: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isRoot: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  fk_status: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'account_status',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
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
  modelName: 'user_account'
})
