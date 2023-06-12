import { RedisService } from '@application/ports/cache/redis_service'
import { JwtToken } from '@application/ports/security/jwtToken'
import { PasswordHasher } from '@application/ports/security/passwordHasher'
import { LoginCustomerRequestModel, LoginCustomerResponseModel, LoginOutputModel } from '@auth/domain/models/useraccount'
import { FindUserByEmailPort } from '@auth/domain/repositories/findUserByEmailPort'
import { LoginCustomerUseCase } from '@auth/domain/usecase/loginCustomer'

export class LoginCustomerUseCaseImpl implements LoginCustomerUseCase {
  constructor (
    private readonly port: FindUserByEmailPort,
    private readonly jwt: JwtToken,
    private readonly hasher: PasswordHasher,
    private readonly cache: RedisService
  ) {}

  async loginCustomer (request: LoginCustomerRequestModel): Promise<LoginCustomerResponseModel> {
    const user = await this.findUserByEmail(request.email)
    await this.checkPassword(request.password, user.passwordHashed)
    const sessionToken = this.jwt.signAccessToken({ userId: user.userId, rol: user.rol })
    const refreshToken = this.jwt.signRefreshToken({ userId: user.userId, rol: user.rol })

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

  private async findUserByEmail (email: string): Promise<LoginOutputModel | never> {
    const user = await this.port.findUserByEmail(email)
    if (user === null) {
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

  private async storeRefreshToken (token: string, user: LoginOutputModel): Promise<void | never> {
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
