import { ExternalApiAdpaterModel } from '@application/ports/api/external_api'
import { MigrateCountryInfoRepositoryPort } from '@domain/repositories/props/migrate_country_info_repository'
import { MigrateCountryInfoUseCase } from '@domain/usecases/migrate_country_info_usecase'

export class MigrateCountryInfoUseCaseImp implements MigrateCountryInfoUseCase {
  constructor (
    private readonly externalApi: ExternalApiAdpaterModel,
    private readonly port: MigrateCountryInfoRepositoryPort
  ) {}

  async migrate (): Promise<void> {
    const data = await this.externalApi.fetchInfoAllCountries()
    await this.port.migrateCountryInfo(data)
  }
}
