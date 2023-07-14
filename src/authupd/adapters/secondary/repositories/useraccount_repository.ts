import { UserRegisterDAOModel } from '@authupd/models/dao/useraccount_dao.model'
import { UserRegisterDTOModel } from '@authupd/models/dto/useraccount_dto.model'
import { InsertUserOutputPort } from '@authupd/ports/output/insertuser_output.port'
import UserAccountModel from '@infrastructure/sequelize/models/UserAccountModel'
import UserProfileModel from '@infrastructure/sequelize/models/UserProfileModel'
import sequelizeInstance from '@infrastructure/sequelize/sequelizeConfig'

export class UserAccounRepositoryAdapter implements InsertUserOutputPort {
  async createUser (newUser: UserRegisterDTOModel): Promise<UserRegisterDAOModel> {
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

    return {
      userId: user.id,
      createdAt: user.createdAt
    }
  }
}
