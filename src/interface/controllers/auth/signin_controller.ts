import { Controller } from '@application/ports/controller/controller'
import { RequestValidationError } from '@application/ports/error/request_validation_error'
import { UnAuthorizedError } from '@application/ports/error/unauthorized_validation_error'
import { HttpRequestModel } from '@application/ports/http/http-requets'
import { HttpResponseHandler, ResponseModel } from '@application/ports/http/http-response'
import { SigninRequestModel, SigninResponseModel } from '@domain/models/auth/useraccount-model'
import { UserSigninUseCase } from '@domain/usecases/signin_usecase'
import { WinstonLoggerAdapter } from '@infrastructure/adapters/logger_adapter'
import { objectKeyExists } from '@shared/helpers/objects/object_key_exists'

export class SigninController implements Controller<SigninResponseModel | null > {
  constructor (
    private readonly userSigninUC: UserSigninUseCase,
    private readonly presenter: HttpResponseHandler<SigninResponseModel>,
    private readonly logger: WinstonLoggerAdapter
  ) {
    this.logger = new WinstonLoggerAdapter()
  }

  async handleRequest (request: HttpRequestModel<SigninRequestModel>):
  Promise<ResponseModel<SigninResponseModel | null>> {
    try {
      if (!objectKeyExists(request, 'body')) {
        throw RequestValidationError.notify('Invalid Requets!')
      }
      const { email, password } = request.body
      const user = await this.userSigninUC.signin({ email, password })
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!user) {
        this.logger.LogError('wrong crendentials')
        throw UnAuthorizedError.notify('wrong credentials')
      }
      this.logger.LogInfo('User has successfully logged in')
      return await this.presenter.response(user, 'User has successfully logged in')
    } catch (error) {
      throw RequestValidationError.notify(String(error))
    }
  }
}
