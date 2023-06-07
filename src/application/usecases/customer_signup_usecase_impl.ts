/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { SignupRepositoryInputModel, SignupRequestModel, SignupResponseModel } from '@domain/models/auth/useraccount-model'
import { CustomerSignupUseCase } from '@domain/usecases/customer_signup_usecase'
import { CreateCustomerRepositoryPort } from '@domain/repositories/useraccount/create_customer_repository'
import { PasswordHasher } from '@application/ports/security/password'
import { UserAccountStatusMap, UserProfileMap } from '@domain/models/maps/useraccount_status_model'

export class CustomerSignupUseCaseImpl implements CustomerSignupUseCase {
  constructor (
    private readonly port: CreateCustomerRepositoryPort,
    private readonly hasher: PasswordHasher
  ) {}

  async customerSignup (request: SignupRequestModel): Promise<SignupResponseModel> | never {
    /** prepare input data to the repository */
    const data: SignupRepositoryInputModel = {
      email: request.email,
      passwordHashed: await this.hasher.hashPassword(request.password),
      phoneNumber: request.phoneNumber,
      userAccountStatusId: UserAccountStatusMap.unverifiableIdentity,
      profileId: UserProfileMap.customers
    }
    return await this.userCreate(data)
  }

  private async userCreate (data: SignupRepositoryInputModel): Promise<SignupResponseModel | never> {
    const user = await this.port.create(data)
    if (!user) throw new Error('user registration failed')
    return user
  }
}
