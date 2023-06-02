import { SignUpRequestModel } from '@domain/models/auth/signup-model'

export interface SignUpUseCase {
  execute: (data: SignUpRequestModel) => Promise<void>
}
