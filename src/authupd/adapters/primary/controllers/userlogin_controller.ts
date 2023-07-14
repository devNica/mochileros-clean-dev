import { UserLoginRequestModel } from '@authupd/models/request/useraccount_req.model'
import { UserLoginResponseModel } from '@authupd/models/response/useraccount_res.model'
import { UserLoginUseCase } from '@authupd/usecases/userlogin_usecase'
import { RequestValidationErrorAdapter } from '@core/adapters/primary/errors/request_validation_error.adapter'
import { HttpRequestModel } from '@core/model/http/http_request.model'
import { HttpResponseModel } from '@core/model/http/http_response.model'
import { ControllerInputPort } from '@core/ports/input/controller/controller_input.port'
import { ControllerOutputPort } from '@core/ports/output/controller/controller_output.port'
import { objectKeyExists } from '@shared/helpers/objects/object_key_exists'

export class UserLoginController implements ControllerInputPort<UserLoginResponseModel | never> {
  constructor (
    private readonly usecase: UserLoginUseCase,
    private readonly presenter: ControllerOutputPort<UserLoginResponseModel>
  ) {}

  async handleRequest (request: HttpRequestModel<UserLoginRequestModel>): Promise<HttpResponseModel<UserLoginResponseModel>> | never {
    try {
      if (!objectKeyExists(request, 'body')) {
        throw new RequestValidationErrorAdapter('Request malformed')
      }
      const user = await this.usecase.exec({
        email: request.body.email,
        password: request.body.password
      })
      return await this.presenter.handleResponse(user, 'Login successfully')
    } catch (error) {
      throw new RequestValidationErrorAdapter(String(error))
    }
  }
}
