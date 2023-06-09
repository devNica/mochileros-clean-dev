import { Controller } from '@application/ports/controller/controller'
import { RequestValidationError } from '@application/ports/error/request_validation_error'
import { HttpRequestModel } from '@application/ports/http/http-requets'
import { HttpResponseHandler, ResponseModel } from '@application/ports/http/http-response'
import { MigrateCountryInfoUseCase } from '@domain/usecases/migrate_country_info_usecase'

export class MigrateCountryInfoController implements Controller<{} | never> {
  constructor (
    private readonly uc: MigrateCountryInfoUseCase,
    private readonly presenter: HttpResponseHandler<{}>
  ) {}

  async handleRequest (_request: HttpRequestModel<any>): Promise<ResponseModel<{}>> {
    try {
      await this.uc.migrate()
      return await this.presenter.response({}, 'success')
    } catch (error) {
      throw RequestValidationError.notify(String(error))
    }
  }
}
