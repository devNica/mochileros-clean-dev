import { UserLoginDAOModel } from '@authupd/models/dao/useraccount_dao.model'

export interface FindUserByEmailOutputPort {
  findUserByEmail: (email: string) => Promise<UserLoginDAOModel | null>
}
