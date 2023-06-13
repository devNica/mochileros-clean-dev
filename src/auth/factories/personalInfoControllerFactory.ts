/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { RegisterPersonalInfoUseCaseImpl } from '@auth/aplication/usecase/registerPersonalInfoImpl'
import { RegisterPersonalInfoController } from '@auth/controllers/registerPersonalInfo'
import { AddPersonalInfoResponseModel } from '@auth/domain/models/personalinfo'
import { createPersonalInfoRepositoryPort } from '@auth/infrastructure/repositories'
import { CreatedResponsePresenter } from '@interface/responses/created_response_presenter'

export const PersonalInfoControllerFactory = () => {
  const registerPersonalInfoUseCase = new RegisterPersonalInfoUseCaseImpl(
    createPersonalInfoRepositoryPort
  )

  const registerPersonalInfoPresenter = new CreatedResponsePresenter<AddPersonalInfoResponseModel>()

  const registerPersonaInfoController = new RegisterPersonalInfoController(
    registerPersonalInfoUseCase,
    registerPersonalInfoPresenter
  )

  return {
    registerPersonaInfoController
  }
}
