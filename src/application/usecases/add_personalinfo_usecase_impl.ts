import { PersonalInfoModel } from '@domain/models/auth/useraccount-model'
import { AddPersonalInfoUseCase } from '@domain/usecases/add_personalinfo_usecase'
import { UserAccountRepositoryPort } from '@domain/repositories/useraccount_reposityory'

export class AddPersonalInfoUseCaseImpl implements AddPersonalInfoUseCase {
  constructor (
    private readonly userRepositoryPort: UserAccountRepositoryPort
  ) {}

  async addPersonalInfo (data: PersonalInfoModel): Promise<boolean> {
    return await this.userRepositoryPort.addPersonalInfo(data)
  }
}
