import { AddPersonalInfoRequestModel, AddPersonalInfoResponseModel } from '../models/personalinfo'

export interface RegisterPersonalInfoUseCase {
  registerPersonalInfo: (request: AddPersonalInfoRequestModel) => Promise<AddPersonalInfoResponseModel>
}
