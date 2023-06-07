import { SignupRepositoryInputModel, SignupRepositoryOutputModel } from '@domain/models/auth/useraccount-model'

export interface CreateUserRepositoryPort {
  create: (requesData: SignupRepositoryInputModel) => Promise<SignupRepositoryOutputModel>
}
