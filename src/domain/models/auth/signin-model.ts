import { PersonalInfoResponseModel } from './user-model'

export interface SignInRequestModel {
  email: string
  password: string
}

export interface SignInResponseModel {
  id: string
  email: string
  info: PersonalInfoResponseModel
  status: boolean
}
