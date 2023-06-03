import { AddPersonalInfoRequestModel, UpdatePersonalInfoRequestModel, UserLoginRequestModel, UserLoginResponseModel, UserRegisterRequesModel } from '@domain/models/auth/useraccount-model'

export interface UserRepositoryPort {
  register: (requestData: UserRegisterRequesModel) => Promise<void>
  login: (requestData: UserLoginRequestModel) => Promise<UserLoginResponseModel>
  addPersonalInfo: (requestData: AddPersonalInfoRequestModel) => Promise<boolean>
  updPersonalInfo: (requestData: UpdatePersonalInfoRequestModel) => Promise<boolean>
}
