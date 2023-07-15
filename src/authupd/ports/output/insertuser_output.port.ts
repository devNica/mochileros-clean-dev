import { UserRegisterDAOModel } from '@authupd/models/dao/useraccount_dao.model'
import { UserRegisterDTOModel } from '@authupd/models/dto/useraccount_dto.model'

export interface InsertUserOutputPort {
  createUser: (newUser: UserRegisterDTOModel) => Promise<UserRegisterDAOModel | null>
}
