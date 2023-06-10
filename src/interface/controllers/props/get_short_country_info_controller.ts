import { Controller } from '@application/ports/controller/controller'
import { RequestValidationError } from '@application/ports/error/request_validation_error'
import { HttpRequestModel } from '@application/ports/http/http-requets'
import { HttpResponseHandler, ResponseModel } from '@application/ports/http/http-response'
import { ShortCountryInfoResponseModel } from '@domain/models/info_country_model'
import { GetShortCountryInfoUseCase } from '@domain/usecases/get_short_country_info_usecase'

export class GetShortCountryInfoController implements Controller <ShortCountryInfoResponseModel | never> {
  constructor (
    private readonly uc: GetShortCountryInfoUseCase,
    private readonly presenter: HttpResponseHandler<ShortCountryInfoResponseModel[]>
  ) {}

  async handleRequest (_request: HttpRequestModel):
  Promise<ResponseModel<ShortCountryInfoResponseModel>> | never {
    try {
      const info = await this.uc.getInfo()
      return await this.presenter.response(info, 'success')
    } catch (error) {
      throw RequestValidationError.notify(String(error))
    }
  }
}
