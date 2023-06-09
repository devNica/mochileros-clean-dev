import { CountryInfoRequestModel } from '@domain/models/info_country_model'

export interface ExternalApiAdpaterModel {
  fetchInfoAllCountries: () => Promise<CountryInfoRequestModel[]>
}
