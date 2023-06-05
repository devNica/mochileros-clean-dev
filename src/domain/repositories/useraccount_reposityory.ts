import { AddPersonalInfoRequestModel, UpdatePersonalInfoRequestModel, SigninRequestModel, SigninResponseModel, SignupRequestModel } from '@domain/models/auth/useraccount-model'

export interface UserAccountRepositoryPort {
  signup: (requestData: SignupRequestModel) => Promise<void>
  signin: (requestData: SigninRequestModel) => Promise<SigninResponseModel>
  addPersonalInfo: (requestData: AddPersonalInfoRequestModel) => Promise<boolean>
  updPersonalInfo: (requestData: UpdatePersonalInfoRequestModel) => Promise<boolean>
}
