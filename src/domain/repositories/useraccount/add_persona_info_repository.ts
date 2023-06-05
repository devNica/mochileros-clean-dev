import { AddPersonalInfoRequestModel } from '@domain/models/auth/useraccount-model'

export interface AddPersonalInfoRepositoryPort {
  addPersonalInfo: (requestData: AddPersonalInfoRequestModel) => Promise<boolean>
}
