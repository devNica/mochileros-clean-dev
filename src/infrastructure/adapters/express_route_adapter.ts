import { NextFunction, Request, Response } from 'express'
import { Controller } from '@application/ports/controller/controller'
import { HttpResponseAdapterModel, HttpStatusMap, HttpStatusResponse, ResponseModel } from '@application/ports/http/http-response'
import { DefaultApplicationError } from '@application/ports/error/default_application_error'

export class HttpResponseAdapter<T> implements ResponseModel<T> {
  constructor (
    public readonly type: HttpStatusResponse,
    public readonly message: string,
    public readonly body: T,
    public readonly code: number
  ) {}

  static response<T>(body: T, type: HttpStatusResponse, message: string): HttpResponseAdapterModel<T> {
    return new HttpResponseAdapter<T>(type, message, body, HttpStatusMap[type])
  }
}

/** This function allows the httpresponse adapter to define the way
 * in which routes and the server respond to the client. */
export function httpResponseMiddleware<T>
(api: HttpResponseAdapter<T>, _req: Request, res: Response, _next: NextFunction): void {
  if (api instanceof HttpResponseAdapter) {
    res.status(api.code).json({ message: api.message, data: api.body })
  }
}

export function expressRouteAdapter<T> (controller: Controller<T>) {
  return async (request: Request, _response: Response, next: NextFunction) => {
    return await Promise.resolve(controller.handleRequest({
      body: request.body,
      params: request.params,
      query: request.query,
      headers: request.headers
    }))
      .then((ctrl) => {
        next(HttpResponseAdapter.response(ctrl.body, ctrl.type, ctrl.message))
      })
      .catch((error: DefaultApplicationError) => {
        next(HttpResponseAdapter.response({}, error.type, error.message))
      })
  }
}
