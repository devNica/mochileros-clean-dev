import { ShortCountryInfoResponseModel } from '@domain/models/info_country_model'

export interface GetShortCountryInfoUseCase {
  getInfo: () => Promise<ShortCountryInfoResponseModel>
}
