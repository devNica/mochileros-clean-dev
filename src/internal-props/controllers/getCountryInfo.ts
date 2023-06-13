import { Controller } from '@application/ports/controller/controller'
import { RequestValidationError } from '@application/ports/error/request_validation_error'
import { HttpRequestModel } from '@application/ports/http/http-requets'
import { HttpResponseHandler, ResponseModel } from '@application/ports/http/http-response'
import { CountryInfoRequestModel, MainCountryInfoResponseModel } from '@internal-props/domain/models/infoCountry'
import { GetCountriesInfoByParametersUseCase } from '@internal-props/domain/usecase/getCountriesInfoByParameters'
import { objectKeyExists } from '@shared/helpers/objects/object_key_exists'

export class GetCountryInfoController implements Controller<MainCountryInfoResponseModel[] | never> {
  constructor (
    private readonly uc: GetCountriesInfoByParametersUseCase,
    private readonly presenter: HttpResponseHandler<MainCountryInfoResponseModel[]>
  ) {}

  async handleRequest (request: HttpRequestModel<CountryInfoRequestModel>): Promise<ResponseModel<MainCountryInfoResponseModel[]>> {
    if (!objectKeyExists(request, 'query')) {
      throw RequestValidationError.notify('Invalid Requets!')
    }
    const { name, cca3 } = request.query
    const info = await this.uc.getCountriesInfo({ name, cca3 })
    return await this.presenter.response(info, 'success')
  }
}
