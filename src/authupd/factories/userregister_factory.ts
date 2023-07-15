import { UserRegisterController } from '@authupd/adapters/primary/controllers/userregister_controller'
import { insertUserRepositoryPort } from '@authupd/adapters/secondary/repositories'
import { UserRegisterResponseModel } from '@authupd/models/response/useraccount_res.model'
import { UserRegisterUsecase } from '@authupd/usecases/userregister_usecase'
import { GenericCreatedResponsePresenter } from '@core/adapters/primary/presenters/generic_created_response'
import { ControllerInputPort } from '@core/ports/input/controller/controller_input.port'
import { passwordEncryptorService } from '@core/services/encrypters/password_encryptor_service'

function factory (): ControllerInputPort {
  const usecase = new UserRegisterUsecase(
    insertUserRepositoryPort,
    passwordEncryptorService
  )

  const presenter = new GenericCreatedResponsePresenter<UserRegisterResponseModel>()

  const userRegisterController = new UserRegisterController(
    usecase,
    presenter
  )

  return userRegisterController
}

export const userRegisterFactory = factory()
