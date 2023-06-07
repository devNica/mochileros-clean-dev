import { DefaultApplicationError } from '@application/ports/error/default_application_error'
import { MiddlewareHandler } from '@application/ports/middleware/http_middleware'
import { NextFunction, Request, Response } from 'express'
import { HttpResponseAdapter } from './express_route_adapter'

export const expressMiddlewareAdapter = (middleware: MiddlewareHandler) => {
  return async (request: Request, _response: Response, next: NextFunction) => {
    return await Promise.resolve(
      middleware.handleRequest({
        query: request.query,
        params: request.params,
        body: request.body,
        headers: request.headers,
        method: request.method
      })
        .then(() => next())
        .catch((error: DefaultApplicationError) => {
          next(HttpResponseAdapter.response({}, error.type, error.message))
        })
    )
  }
}
