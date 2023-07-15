export interface UserRegisterRequestModel {
  email: string
  password: string
  phoneNumber: string
}

export interface UserLoginRequestModel extends Omit<UserRegisterRequestModel, 'phoneNumber'> {}
