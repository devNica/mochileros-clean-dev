import { InsertUserOutputPort } from '@authupd/ports/output/insertuser_output.port'
import { UserAccounRepositoryAdapter } from './useraccount_repository'
import { FindUserByEmailOutputPort } from '@authupd/ports/output/userlogin_output.port'

const userAccountRepositoryAdapter = new UserAccounRepositoryAdapter()

const insertUserRepositoryPort: InsertUserOutputPort = userAccountRepositoryAdapter
const findUserByEmailPort: FindUserByEmailOutputPort = userAccountRepositoryAdapter

export {
  insertUserRepositoryPort,
  findUserByEmailPort
}
