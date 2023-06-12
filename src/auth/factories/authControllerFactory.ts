import { ArgonPasswordAdapter } from '@infrastructure/adapters/argon_password_adapter'
import { WinstonLoggerAdapter } from '@infrastructure/adapters/logger_adapter'
import { RegisterCustomerController } from '@auth/controllers/registerCustomer'
import { CreatedResponsePresenter } from '@interface/responses/created_response_presenter'
import { RegisterCustomerUseCaseImpl } from '@auth/aplication/usecase/registerCustomerImpl'
import { createUserRepositoryPort, findUserByEmailRepositoryPort } from '@auth/infrastructure/repositories'
import { LoginCustomerResponseModel, RegisterCustomerResponseModel } from '@auth/domain/models/useraccount'
import { LoginCustomerUseCaseImpl } from '@auth/aplication/usecase/loginCustomerImpl'
import { jwtTokenAdapter } from '@infrastructure/adapters/jwt_adapter'
import { redisCacheService } from '@application/service/redis_service'
import { SuccessResponsePresenter } from '@interface/responses/success_response_presenter'
import { LoginCustomerController } from '@auth/controllers/loginCustomer'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const UserAccountControllerFactory = () => {
  /** usecases */
  const registerCustomerUC = new RegisterCustomerUseCaseImpl(
    createUserRepositoryPort,
    new ArgonPasswordAdapter()
  )

  const loginCustomerUC = new LoginCustomerUseCaseImpl(
    findUserByEmailRepositoryPort,
    jwtTokenAdapter,
    new ArgonPasswordAdapter(),
    redisCacheService
  )

  /** presenters */
  const registerCustomerPresenter = new CreatedResponsePresenter<RegisterCustomerResponseModel>()
  const loginCustomerPresenter = new SuccessResponsePresenter<LoginCustomerResponseModel>()

  /** controllers */
  const registerCustomerController = new RegisterCustomerController(
    registerCustomerUC,
    registerCustomerPresenter,
    new WinstonLoggerAdapter()
  )

  const loginCustomerController = new LoginCustomerController(
    loginCustomerUC,
    loginCustomerPresenter,
    new WinstonLoggerAdapter()
  )

  return {
    registerCustomerController,
    loginCustomerController
  }
}
