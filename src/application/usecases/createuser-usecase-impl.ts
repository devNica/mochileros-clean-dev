import { UserRegisterRequestModel } from '@domain/models/auth/useraccount-model'
import { CreateUserUseCase } from '@domain/usecases/createuser-usecase'
import { UserRepositoryPort } from '@domain/repositories/user-reposityory'

export class CreateUserUseCaseImpl implements CreateUserUseCase {
  constructor (
    private readonly userRepositoryPort: UserRepositoryPort
  ) {}

  async create (data: UserRegisterRequestModel): Promise<void> {
    await this.userRepositoryPort.register(data)
  }
}
