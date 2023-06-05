import { SigninRequestModel, SigninResponseModel } from '@domain/models/auth/useraccount-model'
import { UserSigninUseCase } from '@domain/usecases/signin_usecase'
import { UserAccountRepositoryPort } from '@domain/repositories/useraccount_reposityory'

export class UserSigninUseCaseImpl implements UserSigninUseCase {
  constructor (
    private readonly userRepositoryPort: UserAccountRepositoryPort
  ) {}

  async userSignin (userData: SigninRequestModel): Promise<SigninResponseModel> {
    return await this.userRepositoryPort.signin(userData)
  }
}
