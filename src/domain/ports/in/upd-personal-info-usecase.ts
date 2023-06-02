import { PersonalInfoRequestModel } from '@domain/models/auth/user-model'

export interface UpdatePersonalInfoUseCase {
  execute: (data: PersonalInfoRequestModel) => Promise<boolean>
}
