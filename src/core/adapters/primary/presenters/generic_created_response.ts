import { HttpStatusMap } from '@application/ports/http/http-response'
import { HttpResponseModel } from '@core/model/http/http_response.model'
import { ControllerOutputPort } from '@core/ports/output/controller/controller_output.port'

export class GenericCreatedResponsePresenter<T> implements ControllerOutputPort<T> {
  async handleResponse (body: T, message: string): Promise<HttpResponseModel<T>> {
    return {
      statusCode: HttpStatusMap.createdRequest,
      body,
      message
    }
  }
}
