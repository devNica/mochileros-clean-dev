import { UserAccountStatusMap } from './maps'

export interface UserAccountModel {
  userId: string
  email: string
  password: string
  phoneNumber: string
  accountStatus: keyof typeof UserAccountStatusMap
}

export interface RegisterCustomerRequestModel extends Omit<UserAccountModel, 'userId' | 'accountStatus'> {}

export interface RegisterUserInputModel extends Omit<UserAccountModel, 'userId' | 'password' | 'accountStatus' > {
  passwordHashed: string
  userAccountStatusId: number
  profileId: number
}

export interface RegisterUserOutputModel {
  userId: string
  createdAt: string
}

export interface RegisterCustomerResponseModel extends RegisterUserOutputModel {}

export interface LoginCustomerRequestModel extends Omit<UserAccountModel, 'userId' | 'phoneNumber' | 'accountStatus'> {}

export interface LoginOutputModel {
  userId: string
  email: string
  passwordHashed: string
  phoneNumber: string
  isRoot: boolean
  rol: string
  status: string
  createdAt: Date
  updatedAt?: Date
}

export interface LoginCustomerResponseModel extends Omit<LoginOutputModel, 'passwordHashed' | 'isRoot'> {
  token: string
}
