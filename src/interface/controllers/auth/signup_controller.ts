/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Controller } from '@application/ports/controller/controller'
import { RequestValidationError } from '@application/ports/error/request_validation_error'
import { HttpRequestModel } from '@application/ports/http/http-requets'
import { HttpResponseHandler, ResponseModel } from '@application/ports/http/http-response'
import { SignupRequestModel, SignupResponseModel } from '@domain/models/auth/useraccount-model'
import { UserSignupUseCase } from '@domain/usecases/signup_usecase'
import { WinstonLoggerAdapter } from '@infrastructure/adapters/logger_adapter'

export class SignupController implements Controller<{} | never> {
  constructor (
    private readonly userSignupUC: UserSignupUseCase,
    private readonly presenter: HttpResponseHandler<SignupResponseModel>,
    private readonly logger: WinstonLoggerAdapter
  ) {
    this.logger = new WinstonLoggerAdapter()
  }

  async handleRequest (request: HttpRequestModel<SignupRequestModel>): Promise<ResponseModel<SignupResponseModel>> {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (request === undefined || !request?.body) {
      throw RequestValidationError.notify('Invalid Request')
    }

    try {
      const { email, password, phoneNumber } = request.body

      const user = await this.userSignupUC.userSignup({
        email,
        password,
        phoneNumber,
        accountStatus: 'unverifiableIdentity'
      })

      this.logger.LogInfo('User register successfull')

      return await this.presenter.response({ ...user }, 'User register successfull')
    } catch (error) {
      throw RequestValidationError.notify(String(error))
    }
  }
}
