import { Request, Response, NextFunction } from 'express'
import { HttpStatusResponse, HttpResponseModel, HttpStatusMap, HttpResponseAdapterModel } from '../../application/ports/http/http-response'
import { Controller } from '@application/ports/controller/controller'

export class HttpResponseAdapter<T> implements HttpResponseModel<T> {
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
    try {
      const httpRequest = {
        body: request.body,
        params: request.params,
        query: request.query,
        headers: request.headers
      }
      const httpResponse = await controller.handleRequest(httpRequest)
      next(HttpResponseAdapter.response(httpResponse.body, httpResponse.type, httpResponse.message))
    } catch (error) {
      next(HttpResponseAdapter.response({}, 'badRequest', `${String(error)}`))
    }
  }
}
