import { UserLoginController } from '@authupd/adapters/primary/controllers/userlogin_controller'
import { findUserByEmailPort } from '@authupd/adapters/secondary/repositories'
import { UserLoginResponseModel } from '@authupd/models/response/useraccount_res.model'
import { UserLoginUseCase } from '@authupd/usecases/userlogin_usecase'
import { GenericCreatedResponsePresenter } from '@core/adapters/primary/presenters/generic_created_response'
import { ControllerInputPort } from '@core/ports/input/controller/controller_input.port'
import { passwordEncryptorService } from '@core/services/encrypters/password_encryptor_service'
import { jwtTokenService } from '@core/services/tokens/token_service'

function factory (): ControllerInputPort {
  const usecase = new UserLoginUseCase(
    findUserByEmailPort,
    passwordEncryptorService,
    jwtTokenService

  )

  const presenter = new GenericCreatedResponsePresenter<UserLoginResponseModel>()

  return new UserLoginController(
    usecase,
    presenter
  )
}

export const userLoginController = factory()
