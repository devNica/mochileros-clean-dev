import { SignedToken, TokenPayloadModel } from './tokenModel'

export interface JwtToken {
  signAccessToken: (payload: TokenPayloadModel) => SignedToken
  signRefreshToken: (payload: TokenPayloadModel) => SignedToken
  verify: (jwtToken: string, isAccessToken?: boolean) => string
}
