import { Controller } from '@application/ports/controller/controller'
import { RequestValidationError } from '@application/ports/error/request_validation_error'
import { UnAuthorizedError } from '@application/ports/error/unauthorized_validation_error'
import { HttpRequestModel } from '@application/ports/http/http-requets'
import { HttpResponseHandler, ResponseModel } from '@application/ports/http/http-response'
import { LoginCustomerRequestModel, LoginCustomerResponseModel } from '@auth/domain/models/useraccount'
import { LoginCustomerUseCase } from '@auth/domain/usecase/loginCustomer'
import { WinstonLoggerAdapter } from '@infrastructure/adapters/logger_adapter'
import { objectKeyExists } from '@shared/helpers/objects/object_key_exists'

export class LoginCustomerController implements Controller<LoginCustomerResponseModel | never > {
  constructor (
    private readonly uc: LoginCustomerUseCase,
    private readonly presenter: HttpResponseHandler<LoginCustomerResponseModel>,
    private readonly logger: WinstonLoggerAdapter
  ) {
    this.logger = new WinstonLoggerAdapter()
  }

  async handleRequest (request: HttpRequestModel<LoginCustomerRequestModel>):
  Promise<ResponseModel<LoginCustomerResponseModel>> | never {
    try {
      if (!objectKeyExists(request, 'body')) {
        throw RequestValidationError.notify('Invalid Requets!')
      }
      const { email, password } = request.body
      const user = await this.uc.loginCustomer({ email, password })
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions

      this.logger.LogInfo('User has successfully logged in')
      return await this.presenter.response(user, 'User has successfully logged in')
    } catch (error) {
      throw UnAuthorizedError.notify(String(error))
    }
  }
}
