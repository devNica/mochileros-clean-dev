import { ShortCountryInfoRepositoryOutputModel } from '@domain/models/info_country_model'
import { FetchShortCountryInfoRepositoryPort } from '@domain/repositories/props/fetch_short_country_info_repository'
import { GetShortCountryInfoUseCase } from '@domain/usecases/get_short_country_info_usecase'

export class GetShortCountryInfoUseCaseImpl implements GetShortCountryInfoUseCase {
  constructor (
    private readonly port: FetchShortCountryInfoRepositoryPort
  ) {}

  async getInfo (): Promise<ShortCountryInfoRepositoryOutputModel[]> {
    return await this.port.fetchInfo()
  }
}
