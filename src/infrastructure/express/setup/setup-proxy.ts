import { Application } from 'express'

export const setupProxy = (app: Application): void => {
  app.set('trust proxy', true)
  app.disabled('x-powered-by')
}
