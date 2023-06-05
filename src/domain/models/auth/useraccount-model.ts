export interface UserAccountModel {
  userId: string
  email: string
  passwordHash: string
  phoneNumber: string
  isActive: boolean
}

export interface SignupRequestModel extends Omit<UserAccountModel, 'userId' | 'isActive'> {}

export interface PersonalInfoModel {
  userId: string
  firstname: string
  lastname: string
  address: string
  dni: string
}

export type AddPersonalInfoRequestModel = PersonalInfoModel

export interface UpdatePersonalInfoRequestModel extends Omit<PersonalInfoModel, 'userId' | 'dni'> {}

export interface SigninRequestModel extends Omit<UserAccountModel, 'userId' | 'phoneNumber' | 'isActive'> {}

export interface SigninResponseModel extends UserAccountModel {
  info: Omit<PersonalInfoModel, 'userId'>
}
