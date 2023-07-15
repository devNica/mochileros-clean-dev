/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { UserLoginRequestModel } from '@authupd/models/request/useraccount_req.model'
import { UserLoginResponseModel } from '@authupd/models/response/useraccount_res.model'
import { UserLoginInputPort } from '@authupd/ports/input/userlogin_input.port'
import { FindUserByEmailOutputPort } from '@authupd/ports/output/userlogin_output.port'
import { PasswordEncryptorOutputPort } from '@core/ports/output/service/encryptors/password_encryptor_output.port'
import { JWTOutputPort } from '@core/ports/output/service/tokens/user_token_output.port'

export class UserLoginUseCase implements UserLoginInputPort {
  constructor (
    private readonly repository: FindUserByEmailOutputPort,
    private readonly encryptor: PasswordEncryptorOutputPort,
    private readonly token: JWTOutputPort
  ) {}

  private async validatePassword (passwordHash: string, password: string): Promise<void | never> {
    const validate = await this.encryptor.validatePassword(passwordHash, password)
    if (!validate) throw new Error('Password is wrong')
  }

  async exec (data: UserLoginRequestModel): Promise<UserLoginResponseModel> {
    const user = await this.repository.findUserByEmail(data.email)
    if (!user) throw new Error('User not found')

    await this.validatePassword(user.passwordHash, data.password)

    const sessionToken = this.token.signAccessToken({ userId: user.userId, roles: [...user.rol.split('.')] })

    return { ...user, token: sessionToken.token }
  }
}
