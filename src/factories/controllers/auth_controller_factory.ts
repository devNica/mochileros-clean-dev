import { UserSigninUseCaseImpl } from '@application/usecases/signin_usecase_impl'
import { UserSignupUseCaseImpl } from '@application/usecases/signup_usecase_impl'
import { SigninResponseModel, SignupResponseModel } from '@domain/models/auth/useraccount-model'
import { ArgonPasswordAdapter } from '@infrastructure/adapters/argon_password_adapter'
import { WinstonLoggerAdapter } from '@infrastructure/adapters/logger_adapter'
import { createUserRepositoryPort, findUserByEmailPort } from '@infrastructure/repositories'
import { SigninController } from '@interface/controllers/auth/signin_controller'
import { SignupController } from '@interface/controllers/auth/signup_controller'
import { CreatedResponsePresenter } from '@interface/responses/created_response_presenter'
import { SuccessResponsePresenter } from '@interface/responses/success_response_presenter'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const UserAccountControllerFactory = () => {
  const signupUseCase = new UserSignupUseCaseImpl(
    createUserRepositoryPort,
    new ArgonPasswordAdapter()
  )

  const signinUseCase = new UserSigninUseCaseImpl(
    findUserByEmailPort,
    new ArgonPasswordAdapter()
  )

  const signupPresenter = new CreatedResponsePresenter<SignupResponseModel>()
  const signupController = new SignupController(
    signupUseCase,
    signupPresenter,
    new WinstonLoggerAdapter()
  )

  const signinPresenter = new SuccessResponsePresenter<SigninResponseModel>()
  const signinController = new SigninController(
    signinUseCase,
    signinPresenter,
    new WinstonLoggerAdapter()
  )

  return {
    signupUseCase,
    signupPresenter,
    signupController,
    signinController
  }
}
