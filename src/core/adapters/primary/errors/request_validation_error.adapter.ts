import { HttpStatusMap } from '@core/model/http/http_response.model'
import { DefaultApplicationErrorAdapter } from './default_application_error.adapter'

export class RequestValidationErrorAdapter extends DefaultApplicationErrorAdapter {
  name = 'Invalid Request'
  statusCode = HttpStatusMap.badRequest
}
