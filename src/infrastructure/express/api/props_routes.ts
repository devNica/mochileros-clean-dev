/* eslint-disable @typescript-eslint/no-misused-promises */
import { PropsControllerFactory } from '@factories/controllers/props_controller_factory'
import { expressRouteAdapter } from '@infrastructure/adapters/express_route_adapter'
import { Router } from 'express'

const { migrateCountryInfoController } = PropsControllerFactory()

export const PropsRouter = Router()

PropsRouter.get('/', expressRouteAdapter(migrateCountryInfoController))
