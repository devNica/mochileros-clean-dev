import { SignupRepositoryPort } from '@domain/repositories/useraccount/signup_repository'
import { AuthRepositoryImpl } from './useraccount_repository'

const authRepositoryImpl = new AuthRepositoryImpl()

const signupRepositoryPort: SignupRepositoryPort = authRepositoryImpl

export {
  signupRepositoryPort
}
