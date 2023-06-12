import { RegisterUserInputModel, RegisterUserOutputModel } from '@auth/domain/models/useraccount'
import { CreateUserRepositoryPort } from '@auth/domain/repositories/createUserRepositoryPort'
import sequelizeInstance from '@infrastructure/configs/sequelize_config'
import UserAccountModel from '@infrastructure/sequelize/models/user_account_model'
import UserProfileModel from '@infrastructure/sequelize/models/user_profile_model'

export class UserAccountRepositoryImpl implements CreateUserRepositoryPort {
  async createUser (data: RegisterUserInputModel): Promise<RegisterUserOutputModel | null> {
    const { email, passwordHashed, phoneNumber, userAccountStatusId } = data
    let user = {
      id: '',
      createdAt: ''
    }

    await sequelizeInstance.transaction(async (t) => {
      user = await UserAccountModel.create({
        email,
        password: passwordHashed,
        phoneNumber,
        isRoot: false,
        fk_status: userAccountStatusId
      }, { transaction: t })

      await UserProfileModel.create({
        fk_user: user.id,
        fk_profile: data.profileId
      }, { transaction: t })
    })

    if (user === null) return null
    return { userId: user.id, createdAt: user.createdAt }
  }
}
