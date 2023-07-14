import { HttpResponseModel } from '@core/model/http/http_response.model'

export interface ControllerOutputPort<T> {
  handleResponse: (body: T, message: string) => Promise<HttpResponseModel<T>>
}
