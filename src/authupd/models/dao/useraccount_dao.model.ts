export interface UserModel {
  userId: string
  email: string
  passwordHash: string
  phoneNumber: string
  isRoot: boolean
  rol: string
  status: string
  createdAt: string
  updatedAt?: string
}

export interface UserRegisterDAOModel extends Pick<UserModel, 'userId' | 'createdAt'> {}

export interface UserLoginDAOModel extends UserModel {}
