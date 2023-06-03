import { UserLoginRequestModel, UserLoginResponseModel } from '@domain/models/auth/useraccount-model'

export interface UserLoginUseCase {
  login: (data: UserLoginRequestModel) => Promise<UserLoginResponseModel>
}
