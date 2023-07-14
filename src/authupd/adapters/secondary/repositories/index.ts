import { InsertUserOutputPort } from '@authupd/ports/output/insertuser_output.port'
import { UserAccounRepositoryAdapter } from './useraccount_repository'

const userAccountRepositoryAdapter = new UserAccounRepositoryAdapter()

const insertUserRepositoryPort: InsertUserOutputPort = userAccountRepositoryAdapter

export {
  insertUserRepositoryPort
}
