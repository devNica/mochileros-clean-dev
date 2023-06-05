import { UpdatePersonalInfoRequestModel } from '@domain/models/auth/useraccount-model'

export interface UpdatePersonalInfoRepositoryPort {
  updPersonalInfo: (requestData: UpdatePersonalInfoRequestModel) => Promise<boolean>
}
