import { UpdatePersonalInfoRequestModel } from '@domain/models/auth/useraccount-model'

export interface UpdatePersonalInfoUsecase {
  updatePersonalInfo: (data: UpdatePersonalInfoRequestModel) => Promise<boolean>
}
