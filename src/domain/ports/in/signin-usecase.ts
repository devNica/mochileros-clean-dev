import { SignInRequestModel, SignInResponseModel } from '@domain/models/auth/signin-model'

export interface SingInUseCase {
  execute: (data: SignInRequestModel) => Promise<SignInResponseModel>
}
