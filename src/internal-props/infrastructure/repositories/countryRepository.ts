import CountryInfoModel from '@infrastructure/sequelize/models/CountryInfoModel'
import { CountryInfoInputModel, MainCountryInfoInputModel, MainCountryInfoOutputModel } from '@internal-props/domain/models/infoCountry'
import { FindCountriesInfoByParametersPort } from '@internal-props/domain/repositories/findCountriesInfoByParametersPort'
import { MigrateCountryRepositoryPort } from '@internal-props/domain/repositories/migrateCountryInfoPort'
import { Op } from 'sequelize'

export class CountryRepositoryImpl implements MigrateCountryRepositoryPort, FindCountriesInfoByParametersPort {
  async insertCountryInfo (requestData: CountryInfoInputModel[]): Promise<void> {
    try {
      await Promise.all(requestData.map(async (c) => {
        await CountryInfoModel.create({
          name: c.name,
          capital: c.capital,
          cca3: c.cca3,
          callingcode: c.callingcode,
          currname: c.currname,
          currcode: c.currcode,
          currsymbol: c.currsymbol,
          states: c.states,
          timezones: c.timezones,
          flagpng: c.flagpng,
          flagsvg: c.flagsvg,
          latitude: c.latitude,
          longitude: c.longitude
        })
      }))
    } catch (error) {
      throw new Error(String(error))
    }
  }

  async findCountriesInfo (data: MainCountryInfoInputModel): Promise<MainCountryInfoOutputModel[]> {
    const info = await CountryInfoModel.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${data.name ?? ''}%` } },
          { cca3: { [Op.like]: `%${data.cca3 ?? ''}%` } }
        ]
      }
    })

    return info
  }
}
