import { SignedToken, TokenPayloadModel } from '@domain/models/token/token_model'

export interface JwtToken {
  signAccessToken: (payload: TokenPayloadModel) => SignedToken
  signRefreshToken: (payload: TokenPayloadModel) => SignedToken
  verify: (jwtToken: string, isAccessToken?: boolean) => string
}
