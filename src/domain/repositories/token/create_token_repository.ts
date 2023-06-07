import { TokenPayloadModel, TokenResponseModel } from '@domain/models/token/token_model'

export interface CreateTokenRepositoryPort {
  create: (payload: TokenPayloadModel) => Promise<TokenResponseModel> | never
}
