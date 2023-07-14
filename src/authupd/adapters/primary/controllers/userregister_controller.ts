/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { UserRegisterRequestModel } from '@authupd/models/request/useraccount_req.model'
import { UserRegisterResponseModel } from '@authupd/models/response/useraccount_res.model'
import { UserRegisterUsecase } from '@authupd/usecases/userregister_usecase'
import { RequestValidationErrorAdapter } from '@core/adapters/primary/errors/request_validation_error.adapter'
import { HttpRequestModel } from '@core/model/http/http_request.model'
import { HttpResponseModel } from '@core/model/http/http_response.model'
import { ControllerInputPort } from '@core/ports/input/controller/controller_input.port'
import { ControllerOutputPort } from '@core/ports/output/controller/controller_output.port'
import { objectKeyExists } from '@shared/helpers/objects/object_key_exists'

export class UserRegisterController implements ControllerInputPort<UserRegisterResponseModel | never> {
  constructor (
    private readonly usecase: UserRegisterUsecase,
    private readonly presenter: ControllerOutputPort<UserRegisterResponseModel>
  ) {}

  async handleRequest (request: HttpRequestModel<UserRegisterRequestModel>): Promise<HttpResponseModel<UserRegisterResponseModel>> | never {
    try {
      if (!objectKeyExists(request, 'body')) {
        throw new Error('Request malformed')
      }

      const { email, password, phoneNumber } = request.body

      const user = await this.usecase.exec({ email, password, phoneNumber })
      return await this.presenter.handleResponse(user, 'User has been created')
    } catch (error) {
      throw new RequestValidationErrorAdapter(String(error))
    }
  }
}
