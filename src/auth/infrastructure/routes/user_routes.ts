/* eslint-disable @typescript-eslint/no-misused-promises */
import { registerCustomerSchema, loginCustomerSchema } from '@auth/aplication/validations/authSchema'
import { UserAccountControllerFactory } from '@auth/factories/authControllerFactory'
import { RequestValidationMiddlewareFactory } from '@auth/factories/validationMiddlewareMiddleware'
import { expressMiddlewareAdapter } from '@infrastructure/adapters/express_middleware_adapter'
import { expressRouteAdapter } from '@infrastructure/adapters/express_route_adapter'
import { Router } from 'express'

export const AuthRouter = Router()

// controllers
const { registerCustomerController, loginCustomerController } = UserAccountControllerFactory()

AuthRouter.post('/customer',
  expressMiddlewareAdapter(RequestValidationMiddlewareFactory(registerCustomerSchema)),
  expressRouteAdapter(registerCustomerController))

AuthRouter.post('/login-customer',
  expressMiddlewareAdapter(RequestValidationMiddlewareFactory(loginCustomerSchema)),
  expressRouteAdapter(loginCustomerController))
