/* eslint-disable @typescript-eslint/no-misused-promises */
import { signinSchema, signupSchema } from '@application/validations/auth_schema'
import { UserAccountControllerFactory } from '@factories/controllers/auth_controller_factory'
import { RequestValidationMiddlewareFactory } from '@factories/middlewares/validation_middleware_factory'
import { expressMiddlewareAdapter } from '@infrastructure/adapters/express_middleware_adapter'
import { expressRouteAdapter } from '@infrastructure/adapters/express_route_adapter'
import { Router } from 'express'

export const AuthRouter = Router()

// controllers
const { customerSignupController, signinController } = UserAccountControllerFactory()

AuthRouter.post('/customer',
  expressMiddlewareAdapter(RequestValidationMiddlewareFactory(signupSchema)),
  expressRouteAdapter(customerSignupController))

AuthRouter.post('/signin',
  expressMiddlewareAdapter(RequestValidationMiddlewareFactory(signinSchema)),
  expressRouteAdapter(signinController))
