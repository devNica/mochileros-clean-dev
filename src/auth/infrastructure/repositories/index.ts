import { CreateUserRepositoryPort } from '@auth/domain/repositories/createUserRepositoryPort'
import { UserAccountRepositoryImpl } from './userAccountRepository'
import { FindUserByEmailPort } from '@auth/domain/repositories/findUserByEmailPort'

const userAccountRepositoryImpl = new UserAccountRepositoryImpl()
const createUserRepositoryPort: CreateUserRepositoryPort = userAccountRepositoryImpl
const findUserByEmailRepositoryPort: FindUserByEmailPort = userAccountRepositoryImpl

export {
  createUserRepositoryPort,
  findUserByEmailRepositoryPort
}
