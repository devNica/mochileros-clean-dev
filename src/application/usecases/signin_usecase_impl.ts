import { SigninRequestModel, SigninResponseModel } from '@domain/models/auth/useraccount-model'
import { findUserByEmailPort } from '@domain/repositories/useraccount/find_user_by_email_repository'
import { UserSigninUseCase } from '@domain/usecases/signin_usecase'

export class UserSigninUseCaseImpl implements UserSigninUseCase {
  constructor (
    private readonly port: findUserByEmailPort
  ) {}

  async signin (userData: SigninRequestModel): Promise<SigninResponseModel | null> {
    return await this.port.findUserByEmail(userData.email)
  }
}
