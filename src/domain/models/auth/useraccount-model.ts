import { UserAccountStatusMap } from '../maps/useraccount_status_model'

export interface UserAccountModel {
  userId: string
  email: string
  password: string
  phoneNumber: string
  accountStatus: keyof typeof UserAccountStatusMap
}

export interface SignupRequestModel extends Omit<UserAccountModel, 'userId' | 'accountStatus'> {}

export interface SignupRepositoryInputModel extends Omit<UserAccountModel, 'userId' | 'password' | 'accountStatus' > {
  passwordHashed: string
  userAccountStatusId: number
}

export interface SignupRepositoryOutputModel {
  userId: string
  createdAt: string
}

export interface SignupResponseModel extends SignupRepositoryOutputModel {}

export interface PersonalInfoModel {
  userId: string
  firstname: string
  lastname: string
  address: string
  dni: string
}

export type AddPersonalInfoRequestModel = PersonalInfoModel

export interface UpdatePersonalInfoRequestModel extends Omit<PersonalInfoModel, 'userId' | 'dni'> {}

export interface SigninRequestModel extends Omit<UserAccountModel, 'userId' | 'phoneNumber' | 'accountStatus'> {}

export interface SigninResponseModel extends Omit<UserAccountModel, 'accountStatus'> {
  fkStatus: number
  // info: Omit<PersonalInfoModel, 'userId'>
}
