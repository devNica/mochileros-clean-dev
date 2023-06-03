import 'reflect-metadata'
import 'source-map-support/register'
import 'module-alias/register'

import express from 'express'

import api from './api'
import { setupGlobalMiddlewares } from './setup/setup-global-middlewares'
import { setupRoutes } from './setup/setup-routes'
import { setupProxy } from './setup/setup-proxy'
import { wLogger } from '@shared/logger/event-logger'
import constants from '@shared/constants'
const app = express()

setupProxy(app)
setupGlobalMiddlewares(app)
setupRoutes(app, api())

app.listen(constants.SERVER_PORT, () => wLogger.logInfo(`🚀 Server is running on port: ${String(constants.SERVER_PORT)}`))
