import { Application, json, urlencoded } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'

export const setupGlobalMiddlewares = (app: Application): void => {
  app.use(json())
  app.use(urlencoded({ extended: false }))
  app.use(cors({ origin: '*' }))
  app.use(morgan('dev'))
  app.use(helmet())
}
