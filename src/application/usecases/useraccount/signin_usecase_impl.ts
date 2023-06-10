/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { PasswordHasher } from '@application/ports/security/password'
import { SigninRepositoryOutputModel, SigninRequestModel, SigninResponseModel } from '@domain/models/auth/useraccount-model'
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
    await this.checkPassword(data.password, user.passwordHashed)
    const sessionToken = this.jwt.signAccessToken({ user_id: user.userId, rol: user.rol })
    const refreshToken = this.jwt.signRefreshToken({ user_id: user.userId, rol: user.rol })

    await this.storeRefreshToken(refreshToken.token, user)

    return {
      userId: user.userId,
      email: user.email,
      phoneNumber: user.phoneNumber,
      rol: user.rol,
      status: user.status,
      createdAt: user.createdAt,
      token: sessionToken.token
    }
  }

  private async findUserByEmail (email: string): Promise<SigninRepositoryOutputModel | never> {
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

  private async storeRefreshToken (token: string, user: SigninRepositoryOutputModel): Promise<void | never> {
    try {
      let currentTokens = await this.cache.getStoreByName('refresh_token')
      currentTokens = currentTokens !== null ? currentTokens : []

      const privateTokens = currentTokens.filter((t: any) => t.id !== user.userId)
      await this.cache.updateStoreByName([...privateTokens, { id: user.userId, toke: token, createdAt: Date.now() }], 'refresh_token')
    } catch (error) {
      throw new Error(`token storage failed: ${String(error)}`)
    }
  }
}
