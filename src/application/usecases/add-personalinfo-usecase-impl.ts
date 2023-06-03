import { PersonalInfoModel } from '@domain/models/auth/useraccount-model'
import { AddPersonalInfoUseCase } from '@domain/ports/in/add-personalinfo-usecase'
import { UserRepositoryPort } from '@domain/ports/repositories/user-reposityory'

export class AddPersonalInfoUseCaseImpl implements AddPersonalInfoUseCase {
  constructor (
    private readonly userRepositoryPort: UserRepositoryPort
  ) {}

  async addPersonalInfo (data: PersonalInfoModel): Promise<boolean> {
    return await this.userRepositoryPort.addPersonalInfo(data)
  }
}
