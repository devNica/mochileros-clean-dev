import { schemaModel } from '@application/ports/validation/joi_validation'
import { RequestValidationMiddleware } from '@interface/middlewares/request_validation_middleware'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const RequestValidationMiddlewareFactory = <T>(schema: schemaModel<T>) => {
  return new RequestValidationMiddleware(schema)
}
