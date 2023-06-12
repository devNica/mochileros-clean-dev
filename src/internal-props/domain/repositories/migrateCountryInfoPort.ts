import { CountryInfoInputModel } from '../models/infoCountry'

export interface MigrateCountryRepositoryPort {
  insertCountryInfo: (data: CountryInfoInputModel[]) => Promise<void>
}
