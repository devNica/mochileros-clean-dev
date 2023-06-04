import { Request, Response, NextFunction } from 'express'
import { HttpStatusResponse, HttpResponseModel, HttpStatusMap, HttpResponseAdapterModel } from '../../application/ports/http/http-response'

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
