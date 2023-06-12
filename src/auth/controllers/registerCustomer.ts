/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Controller } from '@application/ports/controller/controller'
import { RequestValidationError } from '@application/ports/error/request_validation_error'
import { HttpRequestModel } from '@application/ports/http/http-requets'
import { HttpResponseHandler, ResponseModel } from '@application/ports/http/http-response'
import { RegisterCustomerRequestModel, RegisterCustomerResponseModel } from '@auth/domain/models/useraccount'
import { RegisterCustomerUseCase } from '@auth/domain/usecase/registerCustomerUseCase'
import { WinstonLoggerAdapter } from '@infrastructure/adapters/logger_adapter'
import { objectKeyExists } from '@shared/helpers/objects/object_key_exists'

export class RegisterCustomerController implements Controller<RegisterCustomerResponseModel | never> {
  constructor (
    private readonly uc: RegisterCustomerUseCase,
    private readonly presenter: HttpResponseHandler<RegisterCustomerResponseModel>,
    private readonly logger: WinstonLoggerAdapter
  ) {
    this.logger = new WinstonLoggerAdapter()
  }

  async handleRequest (request: HttpRequestModel<RegisterCustomerRequestModel>): Promise<ResponseModel<RegisterCustomerResponseModel>> | never {
    try {
      if (!objectKeyExists(request, 'body')) {
        throw RequestValidationError.notify('Invalid Request')
      }

      const { email, password, phoneNumber } = request.body

      const newUser = await this.uc.registerCustomer({
        email,
        password,
        phoneNumber
      })

      this.logger.LogInfo('User register successfull')

      return await this.presenter.response({ ...newUser }, 'User register successfull')
    } catch (error) {
      throw RequestValidationError.notify(String(error))
    }
  }
}
