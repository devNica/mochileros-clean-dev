import { CountryInfoRequestModel, ShortCountryInfoRepositoryOutputModel } from '@domain/models/info_country_model'
import { FetchShortCountryInfoRepositoryPort } from '@domain/repositories/props/fetch_short_country_info_repository'
import { MigrateCountryInfoRepositoryPort } from '@domain/repositories/props/migrate_country_info_repository'
import CountryInfoModel from '@infrastructure/sequelize/models/country_info_model'

export class PropsRepositoryImpl implements MigrateCountryInfoRepositoryPort, FetchShortCountryInfoRepositoryPort {
  async migrateCountryInfo (requestData: CountryInfoRequestModel[]): Promise<void> {
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

  async fetchInfo (): Promise<ShortCountryInfoRepositoryOutputModel[]> {
    const shortInfo: ShortCountryInfoRepositoryOutputModel[] = await CountryInfoModel.findAll({})
    return shortInfo
  }
}
