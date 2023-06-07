import { HttpStatusMap, HttpStatusResponse, ResponseModel } from '../http/http-response'

export interface ErrorParams {
  type: string
  message: string
}

export type ErrorResponseModel = Omit<ResponseModel<ErrorParams>, 'body' | 'type'>

export class DefaultApplicationError
  extends Error
  implements ErrorResponseModel {
  public code: number
  public type: HttpStatusResponse

  constructor (message: string, type: HttpStatusResponse) {
    super(message)
    this.message = message
    this.code = HttpStatusMap[type]
  }
}
