import { SigninRequestModel, SigninResponseModel } from '@domain/models/auth/useraccount-model'

export interface UserSigninUseCase {
  userSignin: (data: SigninRequestModel) => Promise<SigninResponseModel>
}
