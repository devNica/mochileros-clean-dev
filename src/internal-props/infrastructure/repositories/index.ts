import { MigrateCountryRepositoryPort } from '@internal-props/domain/repositories/migrateCountryInfoPort'
import { CountryRepositoryImpl } from './props_repository'

const countryRepositoryImpl = new CountryRepositoryImpl()

const migrateCountryInfoRepositoryPort: MigrateCountryRepositoryPort = countryRepositoryImpl

export {
  migrateCountryInfoRepositoryPort
}
