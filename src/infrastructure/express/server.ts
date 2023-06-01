import 'reflect-metadata'
import 'source-map-support/register'
import 'module-alias/register'

import express from 'express'

import api from './api'
import { setupGlobalMiddlewares } from './setup/setup-global-middlewares'
import { setupRoutes } from './setup/setup-routes'
import { setupProxy } from './setup/setup-proxy'
const app = express()

setupProxy(app)
setupGlobalMiddlewares(app)
setupRoutes(app, api())

const port = 8900

app.listen(port, () => console.log(`Server is running on port: ${port}`))
