
export interface PersonalInfoRequestModel {
  userId: string
  firstname: string
  lastname: string
  dni: string
  birthdata: Date
  phoneNumber: string
  address: string
}

export interface PersonalInfoResponseModel {
  fullname: string
  dni: string
  birthdate: Date
  phoneNumber: string
  address: string
}
