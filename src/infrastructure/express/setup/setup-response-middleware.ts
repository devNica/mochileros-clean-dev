import { httpResponseMiddleware } from '@infrastructure/adapters/http_response_adapter'
import { Application } from 'express'

export const setupResponseMiddleware = (app: Application): void => {
  app.use(httpResponseMiddleware)
}
