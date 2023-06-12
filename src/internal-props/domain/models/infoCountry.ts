export interface CountryV3Model {
  name: string
  capital: string
  cca3: string
  callingcode: string
  flagpng: string
  flagsvg: string
  currcode: string
  currname: string
  currsymbol: string
}

export interface CountryInfoRequestModel extends CountryV3Model {
  timezones: []
  states: []
  latitude: string
  longitude: string
}

export interface CountryInfoInputModel extends CountryInfoRequestModel {}

export interface ShortCountryInfoRepositoryOutputModel {
  id: number
  name: string
  cca3: string
  callingcode: string
  flagpng: string
  flagsvg: string
}

export type ShortCountryInfoResponseModel = ShortCountryInfoRepositoryOutputModel[]
