import { UserRegisterRequestModel } from '../request/useraccount_req.model'

export interface UserRegisterDTOModel extends Omit<UserRegisterRequestModel, 'password'> {
  passwordHash: string
  userAccountStatusId: number
  profileId: number
}
