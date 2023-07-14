/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { ApplicationErrorModel } from '@core/model/errors/application_error.model'

export class DefaultApplicationErrorAdapter extends Error implements ApplicationErrorModel {
  public statusCode: number = 500
  public messages: string[] = []

  constructor (message: string) {
    super(message)
    this.message = message || this.name
    this.messages.push(this.message)
  }
}
