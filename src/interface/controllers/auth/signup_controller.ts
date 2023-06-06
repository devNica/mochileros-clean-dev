/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Controller } from '@application/ports/controller/controller'
import { HttpRequestModel } from '@application/ports/http/http-requets'
import { HttpResponseHandlerModel, HttpResponseModel } from '@application/ports/http/http-response'
import { SignupRequestModel, SignupResponseModel } from '@domain/models/auth/useraccount-model'
import { UserSignupUseCase } from '@domain/usecases/signup_usecase'
import { WinstonLoggerAdapter } from '@infrastructure/adapters/logger_adapter'

export class SignupController implements Controller<{} | never> {
  constructor (
    private readonly userSignupUC: UserSignupUseCase,
    private readonly presenter: HttpResponseHandlerModel<SignupResponseModel>,
    private readonly logger: WinstonLoggerAdapter
  ) {
    this.logger = new WinstonLoggerAdapter()
  }

  async handleRequest (request: HttpRequestModel<SignupRequestModel>): Promise<HttpResponseModel<SignupResponseModel>> {
    try {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (request === undefined || !request?.body) {
        throw new Error('Invalid Request')
      }
      const { email, password, phoneNumber } = request.body

      const user = await this.userSignupUC.userSignup({ email, password, phoneNumber, accountStatus: 'unverifiableIdentity' })

      this.logger.LogInfo('User register successfull')

      const response = await this.presenter.response({ ...user }, 'createdRequest', 'User register successfull')

      return response
    } catch (error) {
      this.logger.LogError(`Error: ${error}`)
      throw new Error(String(error))
    }
  }
}
