/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { UserLoginRequestModel } from '@authupd/models/request/useraccount_req.model'
import { UserLoginResponseModel } from '@authupd/models/response/useraccount_res.model'
import { UserLoginInputPort } from '@authupd/ports/input/userlogin_input.port'
import { FindUserByEmailOutputPort } from '@authupd/ports/output/userlogin_output.port'

export class UserLoginUseCase implements UserLoginInputPort {
  constructor (
    private readonly repository: FindUserByEmailOutputPort
  ) {}

  async exec (data: UserLoginRequestModel): Promise<UserLoginResponseModel> {
    const user = await this.repository.findUserByEmail(data.email)
    if (!user) throw new Error('User not found')

    return { ...user, token: '' }
  }
}
