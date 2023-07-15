import { UserLoginRequestModel } from '@authupd/models/request/useraccount_req.model'
import { UserLoginResponseModel } from '@authupd/models/response/useraccount_res.model'

export interface UserLoginInputPort {
  exec: (data: UserLoginRequestModel) => Promise<UserLoginResponseModel>
}
