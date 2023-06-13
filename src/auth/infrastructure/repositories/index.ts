import { CreateUserRepositoryPort } from '@auth/domain/repositories/createUserRepositoryPort'
import { UserAccountRepositoryImpl } from './userAccountRepository'
import { FindUserByEmailPort } from '@auth/domain/repositories/findUserByEmailPort'
import { PersonalInfoRepositoryImpl } from './personalInfoRepository'
import { CreatePersonalInfoRepositoryPort } from '@auth/domain/repositories/createPersonalInfoRepositoryPort'

const userAccountRepositoryImpl = new UserAccountRepositoryImpl()
const personalInfoRepositoryImpl = new PersonalInfoRepositoryImpl()

const createUserRepositoryPort: CreateUserRepositoryPort = userAccountRepositoryImpl
const findUserByEmailRepositoryPort: FindUserByEmailPort = userAccountRepositoryImpl

const createPersonalInfoRepositoryPort: CreatePersonalInfoRepositoryPort = personalInfoRepositoryImpl

export {
  createUserRepositoryPort,
  findUserByEmailRepositoryPort,
  createPersonalInfoRepositoryPort
}
