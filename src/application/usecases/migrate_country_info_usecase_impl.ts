import { ExternalApiAdpaterModel } from '@application/ports/api/external_api'
import { MigrateCountryInfoUseCase } from '@domain/usecases/migrate_country_info_usecase'

export class MigrateCountryInfoUseCaseImp implements MigrateCountryInfoUseCase {
  constructor (
    private readonly externalApi: ExternalApiAdpaterModel
  ) {}

  async migrate (): Promise<void> {
    await this.externalApi.fetchInfoAllCountries()
  }
}
