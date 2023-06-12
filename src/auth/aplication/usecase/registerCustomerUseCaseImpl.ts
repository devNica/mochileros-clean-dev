import { RegisterCustomerRequestModel, RegisterCustomerResponseModel, RegisterUserInputModel } from '@auth/domain/models/useraccount'
import { CreateUserRepositoryPort } from '@auth/domain/repositories/createUserRepositoryPort'
import { PasswordHasher } from '@application/ports/security/password'
import { UserAccountStatusMap, UserProfileMap } from '@auth/domain/models/maps'
import { RegisterCustomerUseCase } from '@auth/domain/usecase/registerCustomerUseCase'

export class RegisterCustomerUseCaseImpl implements RegisterCustomerUseCase {
  constructor (
    private readonly port: CreateUserRepositoryPort,
    private readonly hasher: PasswordHasher
  ) {}

  async registerCustomer (request: RegisterCustomerRequestModel): Promise<RegisterCustomerResponseModel> {
    const userData: RegisterUserInputModel = {
      email: request.email,
      passwordHashed: await this.hasher.hashPassword(request.password),
      phoneNumber: request.phoneNumber,
      profileId: UserProfileMap.customers,
      userAccountStatusId: UserAccountStatusMap.unverifiableIdentity
    }

    const newUser = await this.port.createUser(userData)

    if (newUser === null) throw new Error('User register failed')

    return {
      userId: newUser.userId,
      createdAt: newUser.createdAt
    }
  }
}
