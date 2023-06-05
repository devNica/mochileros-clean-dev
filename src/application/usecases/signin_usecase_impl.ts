import { SigninRequestModel, SigninResponseModel } from '@domain/models/auth/useraccount-model'
import { SigninRepositoryPort } from '@domain/repositories/useraccount/signin_repository'
import { UserSigninUseCase } from '@domain/usecases/signin_usecase'

export class UserSigninUseCaseImpl implements UserSigninUseCase {
  constructor (
    private readonly port: SigninRepositoryPort
  ) {}

  async userSignin (userData: SigninRequestModel): Promise<SigninResponseModel> {
    return await this.port.signin(userData)
  }
}
