/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { PasswordHasher } from '@application/ports/security/password'
import { SigninRequestModel, SigninResponseModel } from '@domain/models/auth/useraccount-model'
import { FindUserByEmailPort } from '@domain/repositories/useraccount/find_user_by_email_repository'

import { UserSigninUseCase } from '@domain/usecases/signin_usecase'
import { JwtToken } from '@application/ports/security/jwt_token'
import { RedisService } from '@application/ports/cache/redis_service'

export class UserSigninUseCaseImpl implements UserSigninUseCase {
  constructor (
    private readonly port: FindUserByEmailPort,
    private readonly jwt: JwtToken,
    private readonly hasher: PasswordHasher,
    private readonly cache: RedisService
  ) {}

  async signin (data: SigninRequestModel): Promise<SigninResponseModel> | never {
    const user = await this.findUserByEmail(data.email)
    await this.checkPassword(data.password, user.password)
    const token = this.jwt.signAccessToken({ user_id: user.userId, profile: 'owners' })

    await this.storeRefreshToken(token.token, user)

    return user
  }

  private async findUserByEmail (email: string): Promise<SigninResponseModel | never> {
    const user = await this.port.findUserByEmail(email)
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }

  private async checkPassword (
    password: string,
    hashedPassword: string
  ): Promise<void | never> {
    const validate = await this.hasher.verifyPassword(hashedPassword, password)
    if (!validate) throw new Error('Invalid credentials')
  }

  private async storeRefreshToken (token: string, user: SigninResponseModel): Promise<void | never> {
    let currentTokens = await this.cache.getStoreByName('refresh_token')
    currentTokens = currentTokens !== null ? currentTokens : []

    const privateTokens = currentTokens.filter((t: any) => t.id !== user.userId)
    await this.cache.updateStoreByName([...privateTokens, { id: user.userId, toke: token, createdAt: Date.now() }], 'refresh_token')
  }
}
