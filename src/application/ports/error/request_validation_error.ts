import { HttpStatusResponse } from '../http/http-response'
import { DefaultApplicationError } from './default_application_error'

export class RequestValidationError extends DefaultApplicationError {
  constructor (
    public readonly message: string,
    public readonly type: HttpStatusResponse
  ) {
    super(message, type)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  static notify (message: string) {
    return new RequestValidationError(message, 'badRequest')
  }
}
