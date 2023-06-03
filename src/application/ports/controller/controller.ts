import { HttpRequestModel } from '../http/http-requets'
import { HttpResponseModel } from '../http/http-response'

export interface Controller<T = unknown> {
  handleRequest: (data: HttpRequestModel) => Promise<HttpResponseModel<T>>
}
