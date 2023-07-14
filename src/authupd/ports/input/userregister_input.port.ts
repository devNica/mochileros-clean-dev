import { UserRegisterRequestModel } from '@authupd/models/request/useraccount_req.model'
import { UserRegisterResponseModel } from '@authupd/models/response/useraccount_res.model'

export interface UserRegisterInputPort {
  exec: (data: UserRegisterRequestModel) => Promise<UserRegisterResponseModel>
}
