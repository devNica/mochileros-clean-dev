import { RequestValidationError } from '@application/ports/error/request_validation_error'
import { HttpRequestModel } from '@application/ports/http/http-requets'
import { MiddlewareHandler, MiddlewareRequestModel } from '@application/ports/middleware/http_middleware'
import { JoiSchemaHandler, schemaModel, validationResultModel } from '@application/ports/validation/joi_validation'

export class RequestValidationMiddleware<T> implements MiddlewareHandler, JoiSchemaHandler {
  constructor (
    private readonly joiSchema: schemaModel<T>
  ) {}

  async handleRequest (request: MiddlewareRequestModel): Promise<void> {
    try {
      await this.validate(this.joiSchema, request)
    } catch (error: any) {
      const { message } = error.details[0]
      throw RequestValidationError.notify(message)
    }
  }

  async validate <T>(schema: schemaModel<any>, request: HttpRequestModel): Promise<validationResultModel<T>> {
    return await schema.validateAsync(request.body, { abortEarly: false, allowUnknown: true })
  }
}
