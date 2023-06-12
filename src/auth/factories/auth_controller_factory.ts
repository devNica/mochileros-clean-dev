import { ArgonPasswordAdapter } from '@infrastructure/adapters/argon_password_adapter'
import { WinstonLoggerAdapter } from '@infrastructure/adapters/logger_adapter'
import { RegisterCustomerController } from '@auth/controllers/registerCustomer'
import { CreatedResponsePresenter } from '@interface/responses/created_response_presenter'
import { RegisterCustomerUseCaseImpl } from '@auth/aplication/usecase/registerCustomerUseCaseImpl'
import { createUserRepositoryPort } from '@auth/infrastructure/repositories'
import { RegisterCustomerResponseModel } from '@auth/domain/models/useraccount'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const UserAccountControllerFactory = () => {
  const registerCustomerUC = new RegisterCustomerUseCaseImpl(
    createUserRepositoryPort,
    new ArgonPasswordAdapter()
  )

  const customerSignupPresenter = new CreatedResponsePresenter<RegisterCustomerResponseModel>()
  const customerSignupController = new RegisterCustomerController(
    registerCustomerUC,
    customerSignupPresenter,
    new WinstonLoggerAdapter()
  )

  return {
    customerSignupController
  }
}
