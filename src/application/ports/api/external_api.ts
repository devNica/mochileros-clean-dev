import { CountryInfoRequestModel } from '@internal-props/domain/models/infoCountry'

export interface ExternalApiAdpaterModel {
  fetchInfoAllCountries: () => Promise<CountryInfoRequestModel[]>
}
