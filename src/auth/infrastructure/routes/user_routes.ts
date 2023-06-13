/* eslint-disable @typescript-eslint/no-misused-promises */
import { registerCustomerSchema, loginCustomerSchema, kycSchema } from '@auth/aplication/validations/authSchema'
import { UserAccountControllerFactory } from '@auth/factories/authControllerFactory'
import { PersonalInfoControllerFactory } from '@auth/factories/personalInfoControllerFactory'
import { RequestValidationMiddlewareFactory } from '@auth/factories/validationMiddlewareMiddleware'
import { expressMiddlewareAdapter } from '@infrastructure/adapters/express_middleware_adapter'
import { expressRouteAdapter } from '@infrastructure/adapters/express_route_adapter'
import { Router } from 'express'

export const AuthRouter = Router()

// controllers
const { registerCustomerController, loginCustomerController } = UserAccountControllerFactory()
const { registerPersonaInfoController } = PersonalInfoControllerFactory()

AuthRouter.post('/customer',
  expressMiddlewareAdapter(RequestValidationMiddlewareFactory(registerCustomerSchema)),
  expressRouteAdapter(registerCustomerController))

AuthRouter.post('/login-customer',
  expressMiddlewareAdapter(RequestValidationMiddlewareFactory(loginCustomerSchema)),
  expressRouteAdapter(loginCustomerController))

AuthRouter.post('/kyc',
  expressMiddlewareAdapter(RequestValidationMiddlewareFactory(kycSchema)),
  expressRouteAdapter(registerPersonaInfoController))
