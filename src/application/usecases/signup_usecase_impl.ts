import { SignupRequestModel } from '@domain/models/auth/useraccount-model'
import { UserSignupUseCase } from '@domain/usecases/signup_usecase'
import { UserAccountRepositoryPort } from '@domain/repositories/useraccount_reposityory'

export class UserSignupUseCaseImpl implements UserSignupUseCase {
  constructor (
    private readonly userRepositoryPort: UserAccountRepositoryPort
  ) {}

  async userSignup (data: SignupRequestModel): Promise<void> {
    await this.userRepositoryPort.signup(data)
  }
}
