import { LoginOutputModel, RegisterUserInputModel, RegisterUserOutputModel } from '@auth/domain/models/useraccount'
import { CreateUserRepositoryPort } from '@auth/domain/repositories/createUserRepositoryPort'
import { FindUserByEmailPort } from '@auth/domain/repositories/findUserByEmailPort'
import sequelizeInstance from '@infrastructure/configs/sequelize_config'
import UserAccountModel from '@infrastructure/sequelize/models/UserAccountModel'
import UserProfileModel from '@infrastructure/sequelize/models/UserProfileModel'
import { fetchUserAccountByEmail } from '../queries/user_query'
import { QueryTypes } from 'sequelize'

export class UserAccountRepositoryImpl implements CreateUserRepositoryPort, FindUserByEmailPort {
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

  async findUserByEmail (email: string): Promise<LoginOutputModel | null> {
    const rows: LoginOutputModel[] = await sequelizeInstance.query(fetchUserAccountByEmail(), {
      replacements: {
        email
      },
      type: QueryTypes.SELECT
    })

    console.log(rows)

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!rows) return null
    return {
      userId: rows[0].userId,
      email: rows[0].email,
      passwordHashed: rows[0].passwordHashed,
      phoneNumber: rows[0].phoneNumber,
      isRoot: rows[0].isRoot,
      rol: rows[0].rol,
      status: rows[0].status,
      createdAt: rows[0].createdAt
    }
  }
}
