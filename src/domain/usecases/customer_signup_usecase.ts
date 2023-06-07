import { SignupRequestModel, SignupResponseModel } from '@domain/models/auth/useraccount-model'

export interface CustomerSignupUseCase {
  customerSignup: (request: SignupRequestModel) => Promise<SignupResponseModel> | never
}
