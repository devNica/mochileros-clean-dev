import { ExternalApiAdapter } from '@infrastructure/adapters/external_api_adapter'
import { SuccessResponsePresenter } from '@interface/responses/success_response_presenter'
import { GetCountriesInfoByParametersUseCaseImpl } from '@internal-props/application/getCountriesInfoImpl'
import { MigrateCountryInfoImpl } from '@internal-props/application/mirgateCountryInfoImpl'
import { GetCountryInfoController } from '@internal-props/controllers/getCountryInfo'
import { MigrateCountryInfoController } from '@internal-props/controllers/migrateCountryInfo'
import { MainCountryInfoResponseModel } from '@internal-props/domain/models/infoCountry'
import { findCountryInfoRepositoryPort, migrateCountryInfoRepositoryPort } from '@internal-props/infrastructure/repositories'

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const CountryControllerFactory = () => {
  /** usecases */
  const migrateCountryInfoUC = new MigrateCountryInfoImpl(
    new ExternalApiAdapter(),
    migrateCountryInfoRepositoryPort
  )

  const getCountryInfoUC = new GetCountriesInfoByParametersUseCaseImpl(
    findCountryInfoRepositoryPort
  )

  /** presenters */
  const migrateCountryInfoPresenter = new SuccessResponsePresenter<any>()
  const getCountryInfoPresenter = new SuccessResponsePresenter<MainCountryInfoResponseModel[]>()

  /** controllers */
  const migrateCountryInfoController = new MigrateCountryInfoController(
    migrateCountryInfoUC,
    migrateCountryInfoPresenter
  )

  const getCountryInfoController = new GetCountryInfoController(
    getCountryInfoUC,
    getCountryInfoPresenter
  )

  return {
    migrateCountryInfoController,
    getCountryInfoController
  }
}
