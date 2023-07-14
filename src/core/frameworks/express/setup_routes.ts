import { APIModel } from '@core/model/api/api.model'
import { Application } from 'express'

export async function setupRoutes (app: Application, api: APIModel[]): Promise<void> {
  if (app === undefined || api.length < 1) throw new Error('Error in the parameters necessary to establish the routes')
  api.forEach(route => {
    app.use(route.path, route.controller)
  })
}
