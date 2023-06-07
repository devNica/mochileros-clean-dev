export interface TokenModel {
  user_id: string
  profile: string
  token: string
  expires_in: string
}

export interface TokenPayloadModel extends Omit<TokenModel, 'token' | 'expires_in'> {}

export interface SignedToken {
  token: string
  expirationDate: Date
}

export interface TokenResponseModel extends Omit<TokenModel, 'user_id' | 'profile' | 'expires_in'> {}
