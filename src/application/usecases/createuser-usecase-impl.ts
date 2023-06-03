import { UserRegisterRequesModel } from '@domain/models/auth/useraccount-model'
import { CreateUserUseCase } from '@domain/usecases/createuser-usecase'
import { UserRepositoryPort } from '@domain/repositories/user-reposityory'

export class CreateUserUseCaseImpl implements CreateUserUseCase {
  constructor (
    private readonly userRepositoryPort: UserRepositoryPort
  ) {}

  async create (data: UserRegisterRequesModel): Promise<void> {
    await this.userRepositoryPort.register(data)
  }
}
