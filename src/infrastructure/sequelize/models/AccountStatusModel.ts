import { DataTypes, Model } from 'sequelize'
import { AccountStatusEntity } from '../entities/AccountStatusEntity'
import sequelizeInstance from '@infrastructure/sequelize/sequelizeConfig'

export interface AccountStatusAttrInput extends Required<AccountStatusEntity> {}

export default class AccountStatusModel extends Model<AccountStatusEntity, AccountStatusAttrInput> implements AccountStatusEntity {
  declare id: number
  declare status: string
}

AccountStatusModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  }
},
{
  sequelize: sequelizeInstance,
  modelName: 'account_status'
})
