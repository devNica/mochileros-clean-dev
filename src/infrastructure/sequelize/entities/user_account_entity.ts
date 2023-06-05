export interface UserAccountEntity {
  id: string
  email: string
  password: string
  phoneNumber: string
  isRoot: boolean
  twoFactorAuth: boolean
  fk_status: number
  createdAt: string
  updatedAt: string
}
