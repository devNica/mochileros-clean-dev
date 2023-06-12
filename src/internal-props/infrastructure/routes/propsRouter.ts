/* eslint-disable @typescript-eslint/no-misused-promises */
import { expressRouteAdapter } from '@infrastructure/adapters/express_route_adapter'
import { CountryControllerFactory } from '@internal-props/factories/countryControllerFactory'
import { Router } from 'express'

const { migrateCountryInfoController } = CountryControllerFactory()

export const PropsRouter = Router()

PropsRouter.get('/migrate/country-info', expressRouteAdapter(migrateCountryInfoController))
