import { HttpResponseHandler, ResponseModel } from '@application/ports/http/http-response'

export class CreatedResponsePresenter<T> implements HttpResponseHandler<T> {
  async response (body: T, message: string): Promise<ResponseModel<T>> {
    return {
      type: 'createdRequest',
      body,
      message
    }
  }
}
