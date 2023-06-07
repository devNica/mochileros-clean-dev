export type HttpStatusResponse =
'successRequest' | 'createdRequest' | 'unAuthorizedRequest' |
'forbiddenRequest' | 'badRequest' | 'internalServerErrorRequest' |
'notFoundRequest' | 'payloadTooLargeRequest' | 'unprocessableEntityRequest'

export const HttpStatusMap: Record<HttpStatusResponse, number> = {
  successRequest: 200,
  createdRequest: 201,
  unAuthorizedRequest: 401,
  forbiddenRequest: 403,
  badRequest: 400,
  internalServerErrorRequest: 500,
  notFoundRequest: 404,
  payloadTooLargeRequest: 413,
  unprocessableEntityRequest: 422
}

export interface ResponseModel<T> {
  type: HttpStatusResponse
  message: string
  body: T
}

export interface HttpResponseAdapterModel<T> extends ResponseModel<T> {
  code: number
}

export interface HttpResponseHandler<T> {
  response: (body: T, message: string) => Promise<ResponseModel<T>>
}
