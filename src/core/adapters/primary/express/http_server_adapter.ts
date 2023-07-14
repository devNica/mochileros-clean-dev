import { setupAsyncErrors } from '@core/frameworks/express/setup_async_error'
import { setupGlobalMiddlewares } from '@core/frameworks/express/setup_global_middlewares'
import { setupProxy } from '@core/frameworks/express/setup_proxy'
import { setupRoutes } from '@core/frameworks/express/setup_routes'
import { APIModel } from '@core/model/api/api.model'
import express, { Application, Router } from 'express'

export class ExpressHttpServerAdapter {
  private readonly controllers: APIModel[] = []
  private readonly app: Application
  private readonly router: Router

  constructor () {
    this.app = express()
    this.router = Router()
  }

  private async addController (): Promise<void> {
    // const authController = await authenticationRouter(this.router)
    // this.controllers.push({ path: '/auth', controller: authController as Router })
  }

  public async start (serverPort: number): Promise<void> {
    await this.addController()
    await setupProxy(this.app)
    await setupGlobalMiddlewares(this.app)
    await setupRoutes(this.app, this.controllers)
    await setupAsyncErrors(this.app)
    this.app.listen(serverPort, () => console.log(`server is running at serverPort: ${String(serverPort)}`))
  }
}
