import { ExternalApiAdpaterModel } from '@application/ports/api/external_api'
import { MigrateCountryRepositoryPort } from '@internal-props/domain/repositories/migrateCountryInfoPort'
import { MigrateCountryInfoUseCase } from '@internal-props/domain/usecase/migrateCountryInfo'

export class MigrateCountryInfoImpl implements MigrateCountryInfoUseCase {
  constructor (
    private readonly externalApi: ExternalApiAdpaterModel,
    private readonly port: MigrateCountryRepositoryPort
  ) {}

  async migrateCountryInfo (): Promise<void> {
    const data = await this.externalApi.fetchInfoAllCountries()
    await this.port.insertCountryInfo(data)
  }
}
