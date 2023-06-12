import api, { APIType } from '@infrastructure/express/routes'
import { setupGlobalMiddlewares } from '@infrastructure/express/setup/setup-global-middlewares'
import { setupProxy } from '@infrastructure/express/setup/setup-proxy'
import { setupRoutes } from '@infrastructure/express/setup/setup-routes'
import { setupResponseMiddleware } from '@infrastructure/express/setup/setup_response_middleware'
import express, { Express } from 'express'
import { LoggerAdapterModel } from '@application/ports/logger/logger'

export class HttpServerAdapter {
  private readonly app: Express
  private readonly routes: APIType[]
  constructor (
    private readonly logger: LoggerAdapterModel,
    private readonly serverPort: number
  ) {
    this.app = express()
    this.routes = api()
  }

  public async start (): Promise<void> {
    setupProxy(this.app)
    setupGlobalMiddlewares(this.app)
    setupRoutes(this.app, this.routes)
    setupResponseMiddleware(this.app)
    this.app.listen(this.serverPort, () => this.logger.LogInfo(`🚀 Server is running on port: ${String(this.serverPort)}`))
  }
}
