import { PersonalInfoRequestModel } from '@domain/models/auth/user-model'

export interface AddPersonalInfoUseCase {
  execute: (data: PersonalInfoRequestModel) => Promise<void>
}
