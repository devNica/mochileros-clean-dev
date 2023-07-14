import { HttpRequestModel } from '@core/model/http/http_request.model'
import { HttpResponseModel } from '@core/model/http/http_response.model'

export interface ControllerInputPort<T=unknown> {
  handleRequest: (request: HttpRequestModel) => Promise<HttpResponseModel<T>>
}
