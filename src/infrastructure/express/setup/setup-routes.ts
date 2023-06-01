import { Application, Response } from 'express'
import { APIType } from '../api'

export const setupRoutes = (app: Application, api: APIType[]): void => {
  if (app === undefined || api.length < 1) throw new Error('Error in the parameters necessary to establish the routes')
  api.forEach(route => {
    app.use(route.path, route.controller)
  })

  app.use((_req, res: Response, _next) => {
    res.send('Internal Server Error').status(500)
  })
}
