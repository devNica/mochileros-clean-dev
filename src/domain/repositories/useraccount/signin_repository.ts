import { SigninRequestModel, SigninResponseModel } from '@domain/models/auth/useraccount-model'

export interface SigninRepositoryPort {
  signin: (requestData: SigninRequestModel) => Promise<SigninResponseModel>
}
