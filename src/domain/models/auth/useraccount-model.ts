export interface UserModel {
  userId?: string
  email: string
  passwordHash: string
  phoneNumber: string
  isActive: boolean
}

export interface UserRegisterRequesModel extends Omit<UserModel, 'userId' | 'isActive'> { }

export interface PersonalInfoModel {
  userId: string
  firstname: string
  lastname: string
  address: string
  dni: string
}

export type AddPersonalInfoRequestModel = PersonalInfoModel

export interface UpdatePersonalInfoRequestModel extends Omit<PersonalInfoModel, 'userId' | 'dni'> {}

export interface UserLoginRequestModel extends Omit<UserModel, 'userId' | 'phoneNumber' | 'isActive'> {}

export interface UserLoginResponseModel extends UserModel {
  info: Omit<PersonalInfoModel, 'userId'>
}
