import { Controller } from '@application/ports/controller/controller'
import { RequestValidationError } from '@application/ports/error/request_validation_error'
import { HttpRequestModel } from '@application/ports/http/http-requets'
import { HttpResponseHandler, ResponseModel } from '@application/ports/http/http-response'
import { AddPersonalInfoRequestModel, AddPersonalInfoResponseModel } from '@auth/domain/models/personalinfo'
import { RegisterPersonalInfoUseCase } from '@auth/domain/usecase/registerPersonalInfo'
import { objectKeyExists } from '@shared/helpers/objects/object_key_exists'

export class RegisterPersonalInfoController implements Controller<AddPersonalInfoResponseModel | never> {
  constructor (
    private readonly uc: RegisterPersonalInfoUseCase,
    private readonly presenter: HttpResponseHandler<AddPersonalInfoResponseModel>
  ) {}

  async handleRequest (request: HttpRequestModel<AddPersonalInfoRequestModel>): Promise<ResponseModel<AddPersonalInfoResponseModel>> {
    if (!objectKeyExists(request, 'body')) {
      throw RequestValidationError.notify('Invalid Request')
    }
    const { firstname, lastname, dni, address, birthdate, fkCountry, fkUser } = request.body
    const result = await this.uc.registerPersonalInfo({
      firstname,
      lastname,
      dni,
      address,
      birthdate,
      fkCountry,
      fkUser
    })
    return await this.presenter.response(result, 'success')
  }
}
