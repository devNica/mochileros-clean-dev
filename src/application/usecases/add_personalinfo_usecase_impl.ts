import { PersonalInfoModel } from '@domain/models/auth/useraccount-model'
import { AddPersonalInfoRepositoryPort } from '@domain/repositories/useraccount/add_persona_info_repository'
import { AddPersonalInfoUseCase } from '@domain/usecases/add_personalinfo_usecase'

export class AddPersonalInfoUseCaseImpl implements AddPersonalInfoUseCase {
  constructor (
    private readonly port: AddPersonalInfoRepositoryPort
  ) {}

  async addPersonalInfo (data: PersonalInfoModel): Promise<boolean> {
    return await this.port.addPersonalInfo(data)
  }
}
