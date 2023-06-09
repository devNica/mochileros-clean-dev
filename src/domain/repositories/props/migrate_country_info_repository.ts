import { CountryInfoRequestModel } from '@domain/models/info_country_model'

export interface MigrateCountryInfoRepositoryPort {
  migrateCountryInfo: (requestData: CountryInfoRequestModel[]) => Promise<void>
}
