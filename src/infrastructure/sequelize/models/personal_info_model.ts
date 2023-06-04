import { DataTypes, Model } from 'sequelize'
import { PersonalInfoEntity } from '../entities/personal_info_entity'
import sequelizeInstance from '@infrastructure/configs/sequelize_config'

export default class PersonalInfoModel extends Model<PersonalInfoEntity> implements PersonalInfoEntity {
  id: string
  firstname: string
  lastname: string
  dni: string
  address: string
  fkUser: number
}

PersonalInfoModel.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
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
  fkUser: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'user',
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
