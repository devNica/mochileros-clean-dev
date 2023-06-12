import { DataTypes, Model } from 'sequelize'
import { PersonalInfoEntity } from '../entities/PersonalInfoEntity'
import sequelizeInstance from '@infrastructure/sequelize/sequelizeConfig'

export interface PersonalInfoAttrInput extends Required<PersonalInfoEntity> {}

export default class PersonalInfoModel extends Model<PersonalInfoEntity, PersonalInfoAttrInput> implements PersonalInfoEntity {
  declare id: string
  declare firstname: string
  declare lastname: string
  declare dni: string
  declare address: string
  declare fk_user: string
  declare fk_country: number
}

PersonalInfoModel.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4
  },
  firstname: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  lastname: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  dni: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
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
  fk_country: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'country_info',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  }
},
{
  sequelize: sequelizeInstance,
  modelName: 'personal_info'
})
