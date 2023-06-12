import { LoginCustomerRequestModel, LoginCustomerResponseModel } from '../models/useraccount'

export interface LoginCustomerUseCase {
  loginCustomer: (request: LoginCustomerRequestModel) => Promise<LoginCustomerResponseModel>
}
