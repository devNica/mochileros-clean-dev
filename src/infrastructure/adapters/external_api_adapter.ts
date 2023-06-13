/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { ExternalApiAdpaterModel } from '@application/ports/api/external_api'
import constants from '@shared/constants'
import path from 'path'
import fs from 'fs'
import { CountryInfoRequestModel, CountryV3Model } from '@internal-props/domain/models/infoCountry'

export class ExternalApiAdapter implements ExternalApiAdpaterModel {
  private readonly api: string
  constructor (

  ) {
    this.api = constants.COUNTRY_API
  }

  async fetchInfoAllCountries (): Promise<CountryInfoRequestModel[]> {
    try {
      const response = await fetch(this.api)
      const data: [] = await response.json()

      const countryV3: CountryV3Model[] = data.map((item: any) => {
        return {
          name: item.name.common as string,
          capital: item.capital !== undefined ? item.capital[0] as string : '-' as string,
          cca3: item.cca3 !== undefined ? item.cca3 : '-' as string,
          callingcode: item.idd?.root ? `${item.idd.root}${item.idd.suffixes[0]}` : '-' as string,
          flagpng: item.flags.png || '-' as string,
          flagsvg: item.flags.svg || '-' as string,
          currcode: item?.currencies ? Object.keys(item.currencies)[0] : '-' as string,
          currname: item?.currencies ? Object.values(item.currencies[Object.keys(item.currencies)[0]])[0] as string || '-' : '-' as string,
          currsymbol: item?.currencies ? Object.values(item.currencies[Object.keys(item.currencies)[0]])[1] as string || '$' : '-' as string
        }
      })

      const countries = await this.readCountriesJSON()

      const x: CountryInfoRequestModel[] = countryV3.map(item => {
        const country = countries.filter((j: any) => j.iso3 === item.cca3)
        return {
          timezones: country[0]?.timezones || [],
          states: country[0]?.states as [] || [],
          latitude: country[0]?.latitude || '0.0000000',
          longitude: country[0]?.longitude || '0.0000000',
          ...item
        }
      })
      return x
    } catch (error) {
      throw new Error(`Error fetching info from the api: ${this.api}: ${error}`)
    }
  }

  private async readCountriesJSON (): Promise<any> {
    const filePath = path.join(__dirname, '../data/countries_states_cities.json')
    return await new Promise((resolve, reject) => {
      const result: any = []

      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) reject(err)
        result.push(JSON.parse(data))
        resolve(result[0])
      })
    })
  }
}
