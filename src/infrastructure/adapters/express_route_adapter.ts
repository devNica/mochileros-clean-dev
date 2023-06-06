import { Request, Response } from 'express'
import { Controller } from '@application/ports/controller/controller'

export function expressRouteAdapter<T> (controller: Controller<T>) {
  return async (request: Request, response: Response) => {
    try {
      const httpRequest = {
        body: request.body,
        params: request.params,
        query: request.query,
        headers: request.headers
      }
      const httpResponse = await controller.handleRequest(httpRequest)
      response.status(httpResponse.code).json({ message: httpResponse.message, data: httpResponse.body })
    } catch (error) {
      response.status(400).json({ message: `${String(error)}`, data: {} })
    }
  }
}
