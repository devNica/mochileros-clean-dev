import { RepositoryError } from '@application/ports/error/repositoryError'
import { AddPersonalInfoInputModel, AddPersonalOutputModel } from '@auth/domain/models/personalinfo'
import { CreatePersonalInfoRepositoryPort } from '@auth/domain/repositories/createPersonalInfoRepositoryPort'
import PersonalInfoModel from '@infrastructure/sequelize/models/PersonalInfoModel'

export class PersonalInfoRepositoryImpl implements CreatePersonalInfoRepositoryPort {
  async insertPersonalInfo (data: AddPersonalInfoInputModel): Promise<AddPersonalOutputModel | never> {
    try {
      const personalInfoDTO = {
        fk_user: data.fkUser,
        address: data.address,
        firstname: data.firstname,
        lastname: data.lastname,
        birthdate: data.birthdate,
        dni: data.dni,
        fk_country: data.fkCountry
      }
      const newInfo = await PersonalInfoModel.create(personalInfoDTO)
      return {
        firstname: newInfo.firstname,
        lastname: newInfo.lastname
      }
    } catch (error) {
      throw RepositoryError.notify(String(error))
    }
  }
}
