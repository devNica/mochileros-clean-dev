import { MainCountryInfoRequestModel, MainCountryInfoResponseModel } from '@internal-props/domain/models/infoCountry'
import { FindCountriesInfoByParametersPort } from '@internal-props/domain/repositories/findCountriesInfoByParametersPort'
import { GetCountriesInfoByParametersUseCase } from '@internal-props/domain/usecase/getCountriesInfoByParameters'

export class GetCountriesInfoByParametersUseCaseImpl implements GetCountriesInfoByParametersUseCase {
  constructor (
    private readonly port: FindCountriesInfoByParametersPort
  ) {}

  async getCountriesInfo (request: MainCountryInfoRequestModel): Promise<MainCountryInfoResponseModel[]> | never {
    const countriesInfo = await this.port.findCountriesInfo(request)
    if (countriesInfo === null) throw new Error('query failed error')
    return countriesInfo
  }
}
