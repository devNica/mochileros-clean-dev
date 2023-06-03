import { UpdatePersonalInfoRequestModel } from '@domain/models/auth/useraccount-model'
import { UpdatePersonalInfoUsecase } from '@domain/usecases/upd-personalinfo-usecase'
import { UserRepositoryPort } from '@domain/repositories/user-reposityory'

export class UpdatePersonalInfoUseCaseImpl implements UpdatePersonalInfoUsecase {
  constructor (
    private readonly userRepositoryPort: UserRepositoryPort
  ) {}

  async updatePersonalInfo (data: UpdatePersonalInfoRequestModel): Promise<boolean> {
    return await this.userRepositoryPort.updPersonalInfo(data)
  }
}
