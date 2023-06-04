import { Application } from 'express'
import { APIType } from '../api'
import { HttpResponseAdapter } from '@infrastructure/adapters/http_response_adapter'

export const setupRoutes = (app: Application, api: APIType[]): void => {
  if (app === undefined || api.length < 1) throw new Error('Error in the parameters necessary to establish the routes')
  api.forEach(route => {
    app.use(route.path, route.controller)
  })

  /** any route that is not defined will result in a server error */
  app.use((_req, _res, next) => {
    const error = new Error('Internal Server Error')
    next(HttpResponseAdapter.response({}, 'internalServerErrorRequest', error.message))
  })
}
