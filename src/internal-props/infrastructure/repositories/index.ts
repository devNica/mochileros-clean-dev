import { MigrateCountryRepositoryPort } from '@internal-props/domain/repositories/migrateCountryInfoPort'
import { CountryRepositoryImpl } from './countryRepository'
import { FindCountriesInfoByParametersPort } from '@internal-props/domain/repositories/findCountriesInfoByParametersPort'

const countryRepositoryImpl = new CountryRepositoryImpl()

const migrateCountryInfoRepositoryPort: MigrateCountryRepositoryPort = countryRepositoryImpl
const findCountryInfoRepositoryPort: FindCountriesInfoByParametersPort = countryRepositoryImpl

export {
  migrateCountryInfoRepositoryPort,
  findCountryInfoRepositoryPort
}
