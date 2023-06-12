export interface TokenModel {
  userId: string
  rol: string
  token: string
  expiresIn: string
}

export interface TokenPayloadModel extends Omit<TokenModel, 'token' | 'expiresIn'> {}

export interface SignedToken {
  token: string
  expirationDate: Date
}

export interface TokenResponseModel extends Omit<TokenModel, 'userId' | 'rol' | 'expiresIn'> {}
