import { UserAccountControllerFactory } from '@factories/auth_controller_factory'
import { expressRouteAdapter } from '@infrastructure/adapters/express_route_adapter'
import { Router } from 'express'

export const UserAccountRouter = Router()

// controllers
const { signupController } = UserAccountControllerFactory()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
UserAccountRouter.post('/signup', expressRouteAdapter(signupController))
