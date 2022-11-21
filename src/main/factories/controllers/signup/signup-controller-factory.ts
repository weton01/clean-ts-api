import { Controller } from '../../../../presentation/protocols'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '../../usecases/authentication/dbAuthentication'
import { makeDbAddAccount } from '../../usecases/add-account/db-add-account-factory'
import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

export const makeSignUpController = (): Controller => {
  return makeLogControllerDecorator(
    new SignUpController(
      makeDbAddAccount(),
      makeSignUpValidation(),
      makeDbAuthentication()
    )
  )
}
