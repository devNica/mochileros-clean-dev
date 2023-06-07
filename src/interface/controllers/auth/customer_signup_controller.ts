/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Controller } from '@application/ports/controller/controller'
import { RequestValidationError } from '@application/ports/error/request_validation_error'
import { HttpRequestModel } from '@application/ports/http/http-requets'
import { HttpResponseHandler, ResponseModel } from '@application/ports/http/http-response'
import { SignupRequestModel, SignupResponseModel } from '@domain/models/auth/useraccount-model'
import { CustomerSignupUseCase } from '@domain/usecases/customer_signup_usecase'
import { WinstonLoggerAdapter } from '@infrastructure/adapters/logger_adapter'
import { objectKeyExists } from '@shared/helpers/objects/object_key_exists'

export class CustomerSignupController implements Controller<{} | never> {
  constructor (
    private readonly customerSignupUC: CustomerSignupUseCase,
    private readonly presenter: HttpResponseHandler<SignupResponseModel>,
    private readonly logger: WinstonLoggerAdapter
  ) {
    this.logger = new WinstonLoggerAdapter()
  }

  async handleRequest (request: HttpRequestModel<SignupRequestModel>): Promise<ResponseModel<SignupResponseModel>> {
    try {
      if (!objectKeyExists(request, 'body')) {
        throw RequestValidationError.notify('Invalid Request')
      }

      const { email, password, phoneNumber } = request.body

      const user = await this.customerSignupUC.customerSignup({
        email,
        password,
        phoneNumber
      })

      this.logger.LogInfo('User register successfull')

      return await this.presenter.response({ ...user }, 'User register successfull')
    } catch (error) {
      throw RequestValidationError.notify(String(error))
    }
  }
}
