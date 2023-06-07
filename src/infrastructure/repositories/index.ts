import { CreateCustomerRepositoryPort } from '@domain/repositories/useraccount/create_customer_repository'
import { UserRepositoryImpl } from './useraccount_repository'
import { FindUserByEmailPort } from '@domain/repositories/useraccount/find_user_by_email_repository'

const userRepositoryImpl = new UserRepositoryImpl()

const createUserRepositoryPort: CreateCustomerRepositoryPort = userRepositoryImpl
const findUserByEmailPort: FindUserByEmailPort = userRepositoryImpl

export {
  createUserRepositoryPort,
  findUserByEmailPort
}
