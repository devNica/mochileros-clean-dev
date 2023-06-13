import { AddPersonalInfoInputModel, AddPersonalInfoRequestModel, AddPersonalInfoResponseModel } from '@auth/domain/models/personalinfo'
import { CreatePersonalInfoRepositoryPort } from '@auth/domain/repositories/createPersonalInfoRepositoryPort'
import { RegisterPersonalInfoUseCase } from '@auth/domain/usecase/registerPersonalInfo'

export class RegisterPersonalInfoUseCaseImpl implements RegisterPersonalInfoUseCase {
  constructor (
    private readonly port: CreatePersonalInfoRepositoryPort
  ) {}

  async registerPersonalInfo (request: AddPersonalInfoRequestModel): Promise<AddPersonalInfoResponseModel> {
    const data: AddPersonalInfoInputModel = {
      firstname: request.firstname,
      lastname: request.lastname,
      address: request.address,
      dni: request.dni,
      birthdate: request.birthdate,
      fkCountry: request.fkCountry,
      fkUser: request.fkUser
    }
    const result = await this.port.insertPersonalInfo(data)
    return {
      fullname: result.firstname + result.lastname
    }
  }
}
