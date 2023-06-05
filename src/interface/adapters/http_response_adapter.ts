import { HttpResponseHandlerModel, HttpResponseModel, HttpStatusResponse } from '@application/ports/http/http-response'

export class HttpResponseAdapter<T> implements HttpResponseHandlerModel<T> {
  async response (body: T, type: HttpStatusResponse, message: string): Promise<HttpResponseModel<T>> {
    return {
      type, body, message
    }
  }
}
