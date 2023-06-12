import { CreateUserRepositoryPort } from '@auth/domain/repositories/createUserRepositoryPort'
import { UserAccountRepositoryImpl } from './userAccountRepository'

const userAccountRepositoryImpl = new UserAccountRepositoryImpl()
const createUserRepositoryPort: CreateUserRepositoryPort = userAccountRepositoryImpl

export {
  createUserRepositoryPort
}
