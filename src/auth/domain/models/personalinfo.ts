
export interface PersonalInfoModel {
  firstname: string
  lastname: string
  address: string
  dni: string
  birthdate: string
}

export interface AddPersonalInfoRequestModel extends PersonalInfoModel {
  fkUser: string
  fkCountry: number
}

export interface AddPersonalInfoInputModel extends PersonalInfoModel {
  fkUser: string
  fkCountry: number
}

export interface AddPersonalOutputModel {
  firstname: string
  lastname: string
}

export interface AddPersonalInfoResponseModel {
  fullname: string
}

export interface UpdatePersonalInfoRequestModel extends Omit<PersonalInfoModel, 'userId' | 'dni'> {}
