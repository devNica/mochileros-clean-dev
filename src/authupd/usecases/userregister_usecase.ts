/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { UserAccountStatusMap, UserProfileMap } from '@auth/domain/models/maps'
import { UserRegisterDTOModel } from '@authupd/models/dto/useraccount_dto.model'
import { UserRegisterRequestModel } from '@authupd/models/request/useraccount_req.model'
import { UserRegisterResponseModel } from '@authupd/models/response/useraccount_res.model'
import { UserRegisterInputPort } from '@authupd/ports/input/userregister_input.port'
import { InsertUserOutputPort } from '@authupd/ports/output/insertuser_output.port'
import { PasswordEncryptorOutputPort } from '@core/ports/output/service/encryptors/password_encryptor_output.port'

export class UserRegisterUsecase implements UserRegisterInputPort {
  constructor (
    private readonly repository: InsertUserOutputPort,
    private readonly encryptor: PasswordEncryptorOutputPort

  ) {}

  async exec (data: UserRegisterRequestModel): Promise<UserRegisterResponseModel> {
    const newUSer: UserRegisterDTOModel = {
      email: data.email,
      passwordHash: await this.encryptor.derivePassword(data.password),
      phoneNumber: data.phoneNumber,
      userAccountStatusId: UserAccountStatusMap.unverifiableIdentity,
      profileId: UserProfileMap.customers
    }

    const user = await this.repository.createUser(newUSer)

    if (!user) throw new Error('User registration failed')

    return {
      userId: user.userId,
      createdAt: user.createdAt
    }
  }
}
