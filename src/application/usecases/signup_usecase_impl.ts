/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { SignupRepositoryInputModel, SignupRequestModel, SignupResponseModel } from '@domain/models/auth/useraccount-model'
import { UserSignupUseCase } from '@domain/usecases/signup_usecase'
import { CreateUserRepositoryPort } from '@domain/repositories/useraccount/create_user_repository'
import { PasswordHasher } from '@application/ports/security/password'
import { UserAccountStatusMap } from '@domain/models/maps/useraccount_status_model'

export class UserSignupUseCaseImpl implements UserSignupUseCase {
  constructor (
    private readonly port: CreateUserRepositoryPort,
    private readonly hasher: PasswordHasher
  ) {}

  async userSignup (request: SignupRequestModel): Promise<SignupResponseModel> | never {
    /** prepare input data to the repository */
    const data: SignupRepositoryInputModel = {
      email: request.email,
      passwordHashed: await this.hasher.hashPassword(request.password),
      phoneNumber: request.phoneNumber,
      userAccountStatusId: UserAccountStatusMap.unverifiableIdentity
    }
    return await this.userCreate(data)
  }

  private async userCreate (data: SignupRepositoryInputModel): Promise<SignupResponseModel | never> {
    const user = await this.port.create(data)
    if (!user) throw new Error('user registration failed')
    return user
  }
}
