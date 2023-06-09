import { MigrateCountryInfoRepositoryPort } from '@domain/repositories/props/migrate_country_info_repository'
import { PropsRepositoryImpl } from './props_repository'

const propsRepositoryImpl = new PropsRepositoryImpl()

const migrateCountryInfoRepositoryPort: MigrateCountryInfoRepositoryPort = propsRepositoryImpl

export {
  migrateCountryInfoRepositoryPort
}
