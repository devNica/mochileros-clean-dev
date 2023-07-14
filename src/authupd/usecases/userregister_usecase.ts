import { UserRegisterDTOModel } from '@authupd/models/dto/useraccount_dto.model'
import { UserRegisterRequestModel } from '@authupd/models/request/useraccount_req.model'
import { UserRegisterResponseModel } from '@authupd/models/response/useraccount_res.model'
import { UserRegisterInputPort } from '@authupd/ports/input/userregister_input.port'
import { InsertUserOutputPort } from '@authupd/ports/output/insertuser_output.port'

export class UserRegisterUsecase implements UserRegisterInputPort {
  constructor (
    private readonly port: InsertUserOutputPort
  ) {}

  async exec (data: UserRegisterRequestModel): Promise<UserRegisterResponseModel> {
    const newUSer: UserRegisterDTOModel = {
      email: data.email,
      passwordHash: data.password,
      phoneNumber: data.phoneNumber
    }

    const user = await this.port.createUser(newUSer)
    return {
      userId: user.userId,
      createdAt: user.createdAt
    }
  }
}
