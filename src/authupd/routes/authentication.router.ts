/* eslint-disable @typescript-eslint/no-misused-promises */
import { userRegisterFactory } from '@authupd/factories/userregister_factory'
import { expressRouteAdapter } from '@core/adapters/primary/express/express_route.adapter'
import { Router } from 'express'

const authenticationRouter = Router()

authenticationRouter.post('/', expressRouteAdapter(userRegisterFactory))

export default authenticationRouter
