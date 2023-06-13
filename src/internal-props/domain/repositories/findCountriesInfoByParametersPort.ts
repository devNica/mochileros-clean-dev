import { MainCountryInfoInputModel, MainCountryInfoOutputModel } from '../models/infoCountry'

export interface FindCountriesInfoByParametersPort {
  findCountriesInfo: (data: MainCountryInfoInputModel) => Promise<MainCountryInfoOutputModel[] | never>
}
