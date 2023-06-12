import { RegisterCustomerRequestModel, RegisterCustomerResponseModel } from '../models/useraccount'

export interface RegisterCustomerUseCase {
  registerCustomer: (request: RegisterCustomerRequestModel) => Promise<RegisterCustomerResponseModel>
}
