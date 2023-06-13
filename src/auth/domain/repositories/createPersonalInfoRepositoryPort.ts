import { AddPersonalInfoInputModel, AddPersonalOutputModel } from '../models/personalinfo'

export interface CreatePersonalInfoRepositoryPort {
  insertPersonalInfo: (data: AddPersonalInfoInputModel) => Promise<AddPersonalOutputModel | never>
}
