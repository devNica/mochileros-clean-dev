/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { fetchUserAccountByEmail } from '@authupd/adapters/secondary/queries/user.queries'
import { UserLoginDAOModel, UserRegisterDAOModel } from '@authupd/models/dao/useraccount_dao.model'
import { UserRegisterDTOModel } from '@authupd/models/dto/useraccount_dto.model'
import { InsertUserOutputPort } from '@authupd/ports/output/insertuser_output.port'
import { FindUserByEmailOutputPort } from '@authupd/ports/output/userlogin_output.port'
import UserAccountModel from '@infrastructure/sequelize/models/UserAccountModel'
import UserProfileModel from '@infrastructure/sequelize/models/UserProfileModel'
import sequelizeInstance from '@infrastructure/sequelize/sequelizeConfig'
import { QueryTypes } from 'sequelize'

export class UserAccounRepositoryAdapter implements InsertUserOutputPort, FindUserByEmailOutputPort {
  async createUser (newUser: UserRegisterDTOModel): Promise<UserRegisterDAOModel | null> {
    console.log(newUser)

    let user = {
      id: '',
      createdAt: ''
    }

    await sequelizeInstance.transaction(async (t) => {
      user = await UserAccountModel.create({
        email: newUser.email,
        password: newUser.passwordHash,
        phoneNumber: newUser.phoneNumber,
        isRoot: false,
        fk_status: newUser.userAccountStatusId
      }, { transaction: t })

      await UserProfileModel.create({
        fk_user: user.id,
        fk_profile: newUser.profileId
      }, { transaction: t })
    })

    if (!user) return null

    return {
      userId: user.id,
      createdAt: user.createdAt
    }
  }

  async findUserByEmail (email: string): Promise<UserLoginDAOModel | null> {
    const rows: UserLoginDAOModel[] = await sequelizeInstance.query(fetchUserAccountByEmail(), {
      replacements: {
        email
      },
      type: QueryTypes.SELECT
    })

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!rows) return null
    return {
      userId: rows[0].userId,
      email: rows[0].email,
      passwordHash: rows[0].passwordHash,
      phoneNumber: rows[0].phoneNumber,
      isRoot: rows[0].isRoot,
      rol: rows[0].rol,
      status: rows[0].status,
      createdAt: rows[0].createdAt
    }
  }
}
