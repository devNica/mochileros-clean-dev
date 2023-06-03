import { UpdatePersonalInfoRequestModel } from '@domain/models/auth/useraccount-model'
import { UpdatePersonalInfoUsecase } from '@domain/ports/in/upd-personalinfo-usecase'
import { UserRepositoryPort } from '@domain/ports/out/user-reposityory'

export class UpdatePersonalInfoUseCaseImpl implements UpdatePersonalInfoUsecase {
  constructor (
    private readonly userRepositoryPort: UserRepositoryPort
  ) {}

  async updatePersonalInfo (data: UpdatePersonalInfoRequestModel): Promise<boolean> {
    return await this.userRepositoryPort.updPersonalInfo(data)
  }
}
