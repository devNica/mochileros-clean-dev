export interface UserModel {
  userId: string
  email: string
  passwordHash: string
  createdAt: string
}

export interface UserRegisterDAOModel extends Pick<UserModel, 'userId' | 'createdAt'> {}
