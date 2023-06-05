import { UserSignupUseCaseImpl } from '@application/usecases/signup_usecase_impl'
import { SignupResponseModel } from '@domain/models/auth/useraccount-model'
import { ArgonPasswordAdapter } from '@infrastructure/adapters/argon_password_adapter'
import { signupRepositoryPort } from '@infrastructure/repositories'
import { HttpResponseAdapter } from '@interface/adapters/http_response_adapter'

export const UserAccountControllerFactory = (): any => {
  const userSignupFactory = new UserSignupUseCaseImpl(
    signupRepositoryPort,
    new ArgonPasswordAdapter()
  )

  const userSignupPresenter = new HttpResponseAdapter<SignupResponseModel>()

  return {
    userSignupFactory,
    userSignupPresenter
  }
}
