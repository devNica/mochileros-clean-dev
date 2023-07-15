/* eslint-disable @typescript-eslint/no-misused-promises */
import { userLoginController } from '@authupd/factories/userlogin_factory'
import { userRegisterFactory } from '@authupd/factories/userregister_factory'
import { expressRouteAdapter } from '@core/adapters/primary/express/express_route.adapter'
import { Router } from 'express'

const authenticationRouter = Router()

authenticationRouter.post('/signup', expressRouteAdapter(userRegisterFactory))
authenticationRouter.post('/signin', expressRouteAdapter(userLoginController))

export default authenticationRouter
