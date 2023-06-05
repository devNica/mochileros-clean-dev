import { UpdatePersonalInfoRequestModel } from '@domain/models/auth/useraccount-model'
import { UpdatePersonalInfoUsecase } from '@domain/usecases/upd_personalinfo_usecase'
import { UserAccountRepositoryPort } from '@domain/repositories/useraccount_reposityory'

export class UpdatePersonalInfoUseCaseImpl implements UpdatePersonalInfoUsecase {
  constructor (
    private readonly userRepositoryPort: UserAccountRepositoryPort
  ) {}

  async updatePersonalInfo (data: UpdatePersonalInfoRequestModel): Promise<boolean> {
    return await this.userRepositoryPort.updPersonalInfo(data)
  }
}
