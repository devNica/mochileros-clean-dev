import { UserLoginDAOModel, UserRegisterDAOModel } from '../dao/useraccount_dao.model'

export interface UserRegisterResponseModel extends UserRegisterDAOModel {}

export interface UserLoginResponseModel extends Omit<UserLoginDAOModel, 'passwordHash' | 'updatedAt' | 'isRoot' > {
  token: string
}
