import { SignupRepositoryInputModel, SignupRepositoryOutputModel } from '@domain/models/auth/useraccount-model'

export interface CreateCustomerRepositoryPort {
  create: (data: SignupRepositoryInputModel) => Promise<SignupRepositoryOutputModel | null>
}
