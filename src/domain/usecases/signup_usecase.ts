import { SignupRequestModel } from '@domain/models/auth/useraccount-model'

export interface UserSignupUseCase {
  userSignup: (data: SignupRequestModel) => Promise<void>
}
