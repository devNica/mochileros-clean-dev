import { HttpRequestModel } from '../http/http-requets'
import { ResponseModel } from '../http/http-response'

export interface Controller<T = unknown> {
  handleRequest: (request: HttpRequestModel) => Promise<ResponseModel<T>>
}
