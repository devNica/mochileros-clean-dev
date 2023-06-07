import { SigninRequestModel, SigninResponseModel } from '@domain/models/auth/useraccount-model'

export interface UserSigninUseCase {
  signin: (data: SigninRequestModel) => Promise<SigninResponseModel> | never
}
