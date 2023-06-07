import { HttpResponseHandler, ResponseModel } from '@application/ports/http/http-response'

export class SuccessResponsePresenter<T> implements HttpResponseHandler<T> {
  async response (body: T, message: string): Promise<ResponseModel<T>> {
    return {
      type: 'successRequest',
      body,
      message
    }
  }
}
