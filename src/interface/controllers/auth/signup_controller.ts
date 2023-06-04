/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Controller } from '@application/ports/controller/controller'
import { HttpRequestModel } from '@application/ports/http/http-requets'
import { HttpResponseHandlerModel, HttpResponseModel } from '@application/ports/http/http-response'
import { UserRegisterRequestModel } from '@domain/models/auth/useraccount-model'
import { CreateUserUseCase } from '@domain/usecases/createuser-usecase'
import { WinstonLoggerAdapter } from '@infrastructure/adapters/logger_adapter'

export class SignupController implements Controller<{} | never> {
  constructor (
    private readonly createUserUC: CreateUserUseCase,
    private readonly presenter: HttpResponseHandlerModel<{}>,
    private readonly logger: WinstonLoggerAdapter
  ) {
    this.logger = new WinstonLoggerAdapter()
  }

  async handleRequest (request: HttpRequestModel<UserRegisterRequestModel>): Promise<HttpResponseModel<{}>> {
    try {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (request === undefined || !request?.body) {
        throw new Error('Invalid Request')
      }
      const { email, passwordHash, phoneNumber } = request.body

      await this.createUserUC.create({ email, passwordHash, phoneNumber })

      this.logger.LogInfo('User register successfull')

      const response = await this.presenter.response({}, 'successRequest', 'User register successfull')

      return response
    } catch (error) {
      this.logger.LogError(`Error: ${error}`)

      const response = await this.presenter.response({}, 'badRequest', `Error: ${error}`)

      return response
    }
  }
}
