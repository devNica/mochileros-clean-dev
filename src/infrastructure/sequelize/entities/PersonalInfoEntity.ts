// import { UserEntity } from './user_entity'

// type OmitAllExceptOne<T, K extends keyof T> = Pick<T, K>

// export interface PersonalInfoEntity extends OmitAllExceptOne<UserEntity, 'userId'> {
//   firstname: string
//   lastname: string
//   dni: string
//   address: string
//   nationality: number
// }

export interface PersonalInfoEntity {
  id: string
  firstname: string
  lastname: string
  dni: string
  address: string
  birthdate: string
  fk_user: string
  fk_country: number
}
