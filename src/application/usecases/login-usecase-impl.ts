import { UserLoginRequestModel, UserLoginResponseModel } from '@domain/models/auth/useraccount-model'
import { UserLoginUseCase } from '@domain/usecases/login-usecase'
import { UserRepositoryPort } from '@domain/repositories/user-reposityory'

export class UserLoginUseCaseImpl implements UserLoginUseCase {
  constructor (
    private readonly userRepositoryPort: UserRepositoryPort
  ) {}

  async login (userData: UserLoginRequestModel): Promise<UserLoginResponseModel> {
    return await this.userRepositoryPort.login(userData)
  }
}
