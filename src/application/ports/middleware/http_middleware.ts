import { HttpRequestModel } from '../http/http-requets'

export interface MiddlewareRequestModel extends HttpRequestModel {
  method?: string
}

export interface MiddlewareHandler {
  handleRequest: (requestModel: MiddlewareRequestModel) => Promise<void> | never
}
