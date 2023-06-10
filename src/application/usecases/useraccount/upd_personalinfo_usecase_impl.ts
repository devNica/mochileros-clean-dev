import { UpdatePersonalInfoRequestModel } from '@domain/models/auth/useraccount-model'
import { UpdatePersonalInfoUsecase } from '@domain/usecases/upd_personalinfo_usecase'
import { UpdatePersonalInfoRepositoryPort } from '@domain/repositories/useraccount/upd_personal_info_repository'

export class UpdatePersonalInfoUseCaseImpl implements UpdatePersonalInfoUsecase {
  constructor (
    private readonly port: UpdatePersonalInfoRepositoryPort
  ) {}

  async updatePersonalInfo (data: UpdatePersonalInfoRequestModel): Promise<boolean> {
    return await this.port.updPersonalInfo(data)
  }
}
