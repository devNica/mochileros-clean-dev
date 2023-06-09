import { DataTypes, Model, Optional } from 'sequelize'
import { CountryInfoEntity } from '../entities/country_info_entity'
import sequelizeInstance from '@infrastructure/configs/sequelize_config'

export interface CountryInfoAttrInput extends Optional<CountryInfoEntity, 'id'> {}

export default class CountryInfoModel extends Model<CountryInfoEntity, CountryInfoAttrInput> implements CountryInfoEntity {
  declare id: number
  declare name: string
  declare capital: string
  declare cca3: string
  declare callingcode: string
  declare timezones: []
  declare states: []
  declare latitude: string
  declare longitude: string
  declare flagpng: string
  declare flagsvg: string
  declare currcode: string
  declare currname: string
  declare currsymbol: string
}

CountryInfoModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  capital: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  cca3: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  callingcode: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  timezones: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {}
  },
  states: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: []
  },
  latitude: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  longitude: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  flagpng: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  flagsvg: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  currcode: {
    type: DataTypes.STRING(6),
    allowNull: false
  },
  currname: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  currsymbol: {
    type: DataTypes.STRING(10),
    allowNull: false
  }
},
{
  sequelize: sequelizeInstance,
  modelName: 'country_info'
})
