import { MainCountryInfoInputModel, MainCountryInfoRequestModel, MainCountryInfoResponseModel } from '@internal-props/domain/models/infoCountry'
import { FindCountriesInfoByParametersPort } from '@internal-props/domain/repositories/findCountriesInfoByParametersPort'
import { GetCountriesInfoByParametersUseCase } from '@internal-props/domain/usecase/getCountriesInfoByParameters'
import { capitalize } from '@shared/helpers/string/capitalize'

export class GetCountriesInfoByParametersUseCaseImpl implements GetCountriesInfoByParametersUseCase {
  constructor (
    private readonly port: FindCountriesInfoByParametersPort
  ) {}

  async getCountriesInfo (request: MainCountryInfoRequestModel): Promise<MainCountryInfoResponseModel[]> {
    const data: MainCountryInfoInputModel = {
      name: capitalize(request.name),
      cca3: String(request.cca3).toUpperCase()
    }
    const countriesInfo = await this.port.findCountriesInfo(data)
    if (countriesInfo === null) throw new Error('query failed error')
    return countriesInfo
  }
}
