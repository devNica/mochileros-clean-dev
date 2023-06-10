import { MigrateCountryInfoRepositoryPort } from '@domain/repositories/props/migrate_country_info_repository'
import { PropsRepositoryImpl } from './props_repository'
import { FetchShortCountryInfoRepositoryPort } from '@domain/repositories/props/fetch_short_country_info_repository'

const propsRepositoryImpl = new PropsRepositoryImpl()

const migrateCountryInfoRepositoryPort: MigrateCountryInfoRepositoryPort = propsRepositoryImpl
const fetchCountryInfoRepositoryPort: FetchShortCountryInfoRepositoryPort = propsRepositoryImpl

export {
  migrateCountryInfoRepositoryPort,
  fetchCountryInfoRepositoryPort
}
