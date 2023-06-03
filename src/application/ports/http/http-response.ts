export type HttpStatusResponse =
'successRequest' | 'createdRequest' | 'unAuthorizedRequest' |
'forbiddenRequest' | 'badRequest' | 'internalServerErrorRequets' |
'notFoundRequest' | 'payloadToLargeRequest' | 'unProcessableEntityRequest'

export interface HttpResponseModel<T> {
  type: HttpStatusResponse
  message: string
  body: T
}

export interface HttpResponseHandlerModel<T> {
  response: (body: T, type: HttpStatusResponse, message: string) => Promise<HttpResponseModel<T>>
}
