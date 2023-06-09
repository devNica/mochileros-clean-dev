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
