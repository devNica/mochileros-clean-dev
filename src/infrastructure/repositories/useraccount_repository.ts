/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { SigninResponseModel, SignupRepositoryInputModel, SignupRepositoryOutputModel } from '@domain/models/auth/useraccount-model'
import { FindUserByEmailPort } from '@domain/repositories/useraccount/find_user_by_email_repository'
import { CreateCustomerRepositoryPort } from '@domain/repositories/useraccount/create_customer_repository'
import UserAccountModel from '@infrastructure/sequelize/models/user_account_model'
import sequelizeInstance from '@infrastructure/configs/sequelize_config'
import UserProfileModel from '@infrastructure/sequelize/models/user_profile_model'

export class UserRepositoryImpl implements CreateCustomerRepositoryPort, FindUserByEmailPort {
  async create (data: SignupRepositoryInputModel): Promise<SignupRepositoryOutputModel | null> {
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

    if (!user) return null
    return { userId: user.id, createdAt: user.createdAt }
  }

  async findUserByEmail (email: string): Promise<SigninResponseModel | null> {
    const user = await UserAccountModel.findOne({
      where: { email }
    })

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!user) return null
    return {
      userId: user.id,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
      fkStatus: user.fk_status
    }
  }
}
