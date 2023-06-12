import 'reflect-metadata'
import 'source-map-support/register'
import 'module-alias/register'

import express from 'express'

import api from './routes'
import { setupGlobalMiddlewares } from './setup/setup-global-middlewares'
import { setupRoutes } from './setup/setup-routes'
import { setupProxy } from './setup/setup-proxy'
import { WinstonLoggerAdapter } from '@infrastructure/adapters/logger_adapter'
import constants from '@shared/constants'
import { SequelizeDatabaseAdapter } from '@infrastructure/adapters/sequelize_adapter'
import { setupResponseMiddleware } from './setup/setup_response_middleware'

const app = express()

const logger = new WinstonLoggerAdapter()

const db = new SequelizeDatabaseAdapter()
db.connect()
  .then(() => logger.LogInfo('database connected successfully'))
  .catch(error => logger.LogError(error))

db.syncModels(constants.SEQUELIZE_CONFIG_ALTER)
  .then(() => logger.LogInfo('synchronized database models'))
  .catch(error => logger.LogError(error))

setupProxy(app)
setupGlobalMiddlewares(app)
setupRoutes(app, api())
setupResponseMiddleware(app)

app.listen(constants.SERVER_PORT, () => logger.LogInfo(`🚀 Server is running on port: ${String(constants.SERVER_PORT)}`))
