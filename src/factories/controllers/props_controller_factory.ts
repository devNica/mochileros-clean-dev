import { MigrateCountryInfoUseCaseImp } from '@application/usecases/migrate_country_info_usecase_impl'
import { ExternalApiAdapter } from '@infrastructure/adapters/external_api_adapter'
import { migrateCountryInfoRepositoryPort } from '@infrastructure/repositories/props'
import { MigrateCountryInfoController } from '@interface/controllers/props/migrate_country_info_controller'
import { SuccessResponsePresenter } from '@interface/responses/success_response_presenter'

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const PropsControllerFactory = () => {
  const migrateCountryInfoUC = new MigrateCountryInfoUseCaseImp(
    new ExternalApiAdapter(),
    migrateCountryInfoRepositoryPort
  )

  const presenter = new SuccessResponsePresenter<any>()

  const migrateCountryInfoController = new MigrateCountryInfoController(
    migrateCountryInfoUC,
    presenter
  )

  return {
    migrateCountryInfoController
  }
}
