/* eslint-disable @typescript-eslint/no-misused-promises */
import { signupSchema } from '@application/validations/auth_schema'
import { UserAccountControllerFactory } from '@factories/controllers/auth_controller_factory'
import { RequestValidationMiddlewareFactory } from '@factories/middlewares/validation_middleware_factory'
import { expressMiddlewareAdapter } from '@infrastructure/adapters/express_middleware_adapter'
import { expressRouteAdapter } from '@infrastructure/adapters/express_route_adapter'
import { Router } from 'express'

export const UserAccountRouter = Router()

// controllers
const { signupController, signinController } = UserAccountControllerFactory()

UserAccountRouter.post('/signup',
  expressMiddlewareAdapter(RequestValidationMiddlewareFactory(signupSchema)),
  expressRouteAdapter(signupController))

UserAccountRouter.post('/signin',
  expressRouteAdapter(signinController))
