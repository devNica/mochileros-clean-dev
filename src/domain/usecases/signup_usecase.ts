import { SignupRequestModel, SignupResponseModel } from '@domain/models/auth/useraccount-model'

export interface UserSignupUseCase {
  userSignup: (data: SignupRequestModel) => Promise<SignupResponseModel>
}
