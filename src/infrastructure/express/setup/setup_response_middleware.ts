import { httpResponseMiddleware } from '@infrastructure/adapters/express_route_adapter'
import { Application } from 'express'

export const setupResponseMiddleware = (app: Application): void => {
  app.use(httpResponseMiddleware)
}
