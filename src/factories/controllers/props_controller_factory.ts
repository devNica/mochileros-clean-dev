import { GetShortCountryInfoUseCaseImpl } from '@application/usecases/props/get_short_country_info_usecase_impl'
import { MigrateCountryInfoUseCaseImp } from '@application/usecases/props/migrate_country_info_usecase_impl'
import { ShortCountryInfoResponseModel } from '@domain/models/info_country_model'
import { ExternalApiAdapter } from '@infrastructure/adapters/external_api_adapter'
import { fetchCountryInfoRepositoryPort, migrateCountryInfoRepositoryPort } from '@infrastructure/repositories/props'
import { GetShortCountryInfoController } from '@interface/controllers/props/get_short_country_info_controller'
import { MigrateCountryInfoController } from '@interface/controllers/props/migrate_country_info_controller'
import { SuccessResponsePresenter } from '@interface/responses/success_response_presenter'

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const PropsControllerFactory = () => {
  const migrateCountryInfoUC = new MigrateCountryInfoUseCaseImp(
    new ExternalApiAdapter(),
    migrateCountryInfoRepositoryPort
  )

  const fetchShortCountryInfoUC = new GetShortCountryInfoUseCaseImpl(
    fetchCountryInfoRepositoryPort
  )

  const migratePresenter = new SuccessResponsePresenter<any>()
  const fetchPresenter = new SuccessResponsePresenter<ShortCountryInfoResponseModel>()

  const migrateCountryInfoController = new MigrateCountryInfoController(
    migrateCountryInfoUC,
    migratePresenter
  )

  const fetchShortCountryInfoController = new GetShortCountryInfoController(
    fetchShortCountryInfoUC,
    fetchPresenter
  )

  return {
    migrateCountryInfoController,
    fetchShortCountryInfoController
  }
}
