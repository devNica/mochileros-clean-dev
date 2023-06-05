import { SignupRepositoryInputModel, SignupRepositoryOutputModel } from '@domain/models/auth/useraccount-model'

export interface SignupRepositoryPort {
  signup: (requesData: SignupRepositoryInputModel) => Promise<SignupRepositoryOutputModel>
}
