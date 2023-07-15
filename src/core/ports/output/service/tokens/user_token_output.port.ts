import { SignedToken, TokenPayloadModel } from '@core/model/token/token.model'

export interface JWTOutputPort {
  signAccessToken: (payload: TokenPayloadModel) => SignedToken
  signRefreshToken: (payload: TokenPayloadModel) => SignedToken
  verify: (jwtToken: string, isAccessToken?: boolean) => string
}
