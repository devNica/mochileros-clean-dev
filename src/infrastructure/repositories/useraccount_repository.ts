import { SignupRepositoryInputModel, SignupRepositoryOutputModel } from '@domain/models/auth/useraccount-model'
import { SignupRepositoryPort } from '@domain/repositories/useraccount/signup_repository'
import UserAccountModel from '@infrastructure/sequelize/models/user_account_model'

export class AuthRepositoryImpl implements SignupRepositoryPort {
  async signup (data: SignupRepositoryInputModel): Promise<SignupRepositoryOutputModel> {
    const { email, passwordHashed, phoneNumber, userAccountStatusId } = data
    const user = await UserAccountModel.create({
      email,
      password: passwordHashed,
      phoneNumber,
      isRoot: false,
      fk_status: userAccountStatusId
    })
    return { userId: user.id, createdAt: user.createdAt }
  }
}
