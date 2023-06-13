import { MainCountryInfoRequestModel, MainCountryInfoResponseModel } from '../models/infoCountry'

export interface GetCountriesInfoByParametersUseCase {
  getCountriesInfo: (request: MainCountryInfoRequestModel) => Promise<MainCountryInfoResponseModel[]> | never
}
