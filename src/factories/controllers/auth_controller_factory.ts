import { UserSignupUseCaseImpl } from '@application/usecases/signup_usecase_impl'
import { SignupResponseModel } from '@domain/models/auth/useraccount-model'
import { ArgonPasswordAdapter } from '@infrastructure/adapters/argon_password_adapter'
import { WinstonLoggerAdapter } from '@infrastructure/adapters/logger_adapter'
import { signupRepositoryPort } from '@infrastructure/repositories'
import { SignupController } from '@interface/controllers/auth/signup_controller'
import { CreatedResponsePresenter } from '@interface/responses/created_response_presenter'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const UserAccountControllerFactory = () => {
  const signupUseCase = new UserSignupUseCaseImpl(
    signupRepositoryPort,
    new ArgonPasswordAdapter()
  )

  const signupPresenter = new CreatedResponsePresenter<SignupResponseModel>()
  const signupController = new SignupController(
    signupUseCase,
    signupPresenter,
    new WinstonLoggerAdapter()
  )

  return {
    signupUseCase,
    signupPresenter,
    signupController
  }
}