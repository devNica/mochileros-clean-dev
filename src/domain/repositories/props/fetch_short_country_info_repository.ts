import { ShortCountryInfoRepositoryOutputModel } from '@domain/models/info_country_model'

export interface FetchShortCountryInfoRepositoryPort {
  fetchInfo: () => Promise<ShortCountryInfoRepositoryOutputModel[]>
}
