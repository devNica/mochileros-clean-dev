import { UserRegisterDAOModel } from '@authupd/models/dao/useraccount_dao.model'
import { UserRegisterDTOModel } from '@authupd/models/dto/useraccount_dto.model'
import { InsertUserOutputPort } from '@authupd/ports/output/insertuser_output.port'

export class UserAccounRepositoryAdapter implements InsertUserOutputPort {
  async createUser (newUser: UserRegisterDTOModel): Promise<UserRegisterDAOModel> {
    console.log(newUser)
    return {
      userId: '0001-00999',
      createdAt: '2023-07-14T20:50:22.102Z'
    }
  }
}
