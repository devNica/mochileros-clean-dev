import { AddPersonalInfoRequestModel } from '@domain/models/auth/useraccount-model'

export interface AddPersonalInfoUseCase {
  addPersonalInfo: (data: AddPersonalInfoRequestModel) => Promise<boolean>
}
