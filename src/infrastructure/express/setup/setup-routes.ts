import { Application } from 'express'
import { APIType } from '../routes'
import { HttpResponseAdapter } from '@infrastructure/adapters/express_route_adapter'

export const setupRoutes = (app: Application, api: APIType[]): void => {
  if (app === undefined || api.length < 1) throw new Error('Error in the parameters necessary to establish the routes')
  api.forEach(route => {
    app.use(route.path, route.controller)
  })

  /** any route that is not defined will result in a server error */
  app.use((_req, _res, next) => {
    next(HttpResponseAdapter.response({}, 'notFoundRequest', 'Endpoint not found'))
  })
}
