/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { JwtToken } from '@application/ports/security/jwt_token'
import { TokenPayloadModel, SignedToken } from '@domain/models/token/token_model'
import constants from '@shared/constants'
import { createFutureDate } from '@shared/helpers/dates/create_future_date'
import jwt from 'jsonwebtoken'

export class JwtTokenAdapter implements JwtToken {
  constructor (
    private readonly secret: string,
    private readonly refreshSecret: string,
    private readonly accessTokenExpirationInSecond = 600, // 10 minutes
    private readonly refreshTokenExpirationInSecond = 900 // 15 minutes
  ) {}

  signAccessToken (payload: TokenPayloadModel): SignedToken {
    const expirationDate = createFutureDate(
      new Date(),
      this.accessTokenExpirationInSecond
    )

    const token = jwt.sign(payload, this.secret, {
      expiresIn: this.accessTokenExpirationInSecond
    })

    return { token, expirationDate }
  }

  signRefreshToken (payload: TokenPayloadModel): SignedToken {
    const expirationDate = createFutureDate(
      new Date(),
      this.accessTokenExpirationInSecond
    )

    const token = jwt.sign(payload, this.refreshSecret, {
      expiresIn: this.refreshTokenExpirationInSecond
    })

    return { token, expirationDate }
  }

  verify (token: string, isAccessToken?: boolean | undefined): string {
    const secret = isAccessToken ? this.secret : this.refreshSecret
    const userData = jwt.verify(token, secret) as { id: string }
    return userData.id
  }
}

const secret = constants.JWT_SECRET
const refreshSecret = constants.JWT_SECRET_REFRESH
const secretExpiration = constants.JWT_SECRET_EXPIRATION_SECS
const refreshSecretExpiration = constants.JWT_SECRET_REFRESH_EXPIRATION_SECS

export const jwtTokenAdapter = new JwtTokenAdapter(
  secret,
  refreshSecret,
  secretExpiration,
  refreshSecretExpiration
)
