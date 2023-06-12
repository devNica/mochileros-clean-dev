
export interface PersonalInfoModel {
  userId: string
  firstname: string
  lastname: string
  address: string
  dni: string
}

export type AddPersonalInfoRequestModel = PersonalInfoModel

export interface UpdatePersonalInfoRequestModel extends Omit<PersonalInfoModel, 'userId' | 'dni'> {}
