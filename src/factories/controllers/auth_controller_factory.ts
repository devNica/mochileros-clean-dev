import { SigninResponseModel, SignupResponseModel } from '@domain/models/auth/useraccount-model'
import { ArgonPasswordAdapter } from '@infrastructure/adapters/argon_password_adapter'
import { WinstonLoggerAdapter } from '@infrastructure/adapters/logger_adapter'
import { createUserRepositoryPort, findUserByEmailPort } from '@infrastructure/repositories/useraccount'
import { SigninController } from '@interface/controllers/auth/signin_controller'
import { CustomerSignupController } from '@interface/controllers/auth/customer_signup_controller'
import { CreatedResponsePresenter } from '@interface/responses/created_response_presenter'
import { SuccessResponsePresenter } from '@interface/responses/success_response_presenter'
import { jwtTokenAdapter } from '@infrastructure/adapters/jwt_adapter'
import { redisCacheService } from '@application/service/redis_service'
import { CustomerSignupUseCaseImpl } from '@application/usecases/useraccount/customer_signup_usecase_impl'
import { UserSigninUseCaseImpl } from '@application/usecases/useraccount/signin_usecase_impl'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const UserAccountControllerFactory = () => {
  const customerSignupUC = new CustomerSignupUseCaseImpl(
    createUserRepositoryPort,
    new ArgonPasswordAdapter()
  )

  const signinUseCase = new UserSigninUseCaseImpl(
    findUserByEmailPort,
    jwtTokenAdapter,
    new ArgonPasswordAdapter(),
    redisCacheService
  )

  const customerSignupPresenter = new CreatedResponsePresenter<SignupResponseModel>()
  const customerSignupController = new CustomerSignupController(
    customerSignupUC,
    customerSignupPresenter,
    new WinstonLoggerAdapter()
  )

  const signinPresenter = new SuccessResponsePresenter<SigninResponseModel>()
  const signinController = new SigninController(
    signinUseCase,
    signinPresenter,
    new WinstonLoggerAdapter()
  )

  return {
    customerSignupUC,
    customerSignupPresenter,
    customerSignupController,
    signinController
  }
}
