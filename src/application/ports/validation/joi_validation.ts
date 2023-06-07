import Joi from 'joi'
import { HttpRequestModel } from '../http/http-requets'

export type schemaModel<T> = Joi.ObjectSchema<T>
export type validationResultModel<T> = Joi.ValidationResult<T>

export interface JoiErrorDetailsModel {
  message: string
  path: any
  type: string
  context: any
}

export interface JoiSchemaHandler {
  validate: <T>(schema: schemaModel<T>, request: HttpRequestModel) => Promise<validationResultModel<T>>
}
