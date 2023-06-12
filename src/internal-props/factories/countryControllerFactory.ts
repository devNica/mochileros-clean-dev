import { ExternalApiAdapter } from '@infrastructure/adapters/external_api_adapter'
import { SuccessResponsePresenter } from '@interface/responses/success_response_presenter'
import { MigrateCountryInfoImpl } from '@internal-props/application/mirgateCountryInfoImpl'
import { MigrateCountryInfoController } from '@internal-props/controllers/migrateCountryInfo'
import { migrateCountryInfoRepositoryPort } from '@internal-props/infrastructure/repositories'

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const CountryControllerFactory = () => {
  const migrateCountryInfoUC = new MigrateCountryInfoImpl(
    new ExternalApiAdapter(),
    migrateCountryInfoRepositoryPort
  )

  const migrateCountryInfoPresenter = new SuccessResponsePresenter<any>()

  const migrateCountryInfoController = new MigrateCountryInfoController(
    migrateCountryInfoUC,
    migrateCountryInfoPresenter
  )

  return {
    migrateCountryInfoController
  }
}
