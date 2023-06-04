import 'reflect-metadata'
import 'source-map-support/register'
import 'module-alias/register'

import express from 'express'

import api from './api'
import { setupGlobalMiddlewares } from './setup/setup-global-middlewares'
import { setupRoutes } from './setup/setup-routes'
import { setupProxy } from './setup/setup-proxy'
import { WinstonLoggerAdapter } from '@infrastructure/adapters/logger_adapter'
import constants from '@shared/constants'
import { setupResponseMiddleware } from './setup/setup-response-middleware'
const app = express()

setupProxy(app)
setupGlobalMiddlewares(app)
setupRoutes(app, api())
setupResponseMiddleware(app)

const logger = new WinstonLoggerAdapter()

app.listen(constants.SERVER_PORT, () => logger.LogInfo(`🚀 Server is running on port: ${String(constants.SERVER_PORT)}`))
