/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextFunction, Request, Response } from 'express'
import { DefaultApplicationErrorAdapter } from '../errors/default_application_error.adapter'

export function expressAsyncErrorsAdapter
(error: Error, _req: Request, res: Response, next: NextFunction): void {
  if (!error) return next()

  if (!(error instanceof DefaultApplicationErrorAdapter)) {
    res.status(500).json({
      data: {
        errorName: error.name,
        messages: ['Something went wrong']
      },
      message: 'Something went wrong'
    })
  }

  if (error instanceof DefaultApplicationErrorAdapter) {
    res.status(error.statusCode)
      .json({
        message: error.message,
        data: {
          name: error.name,
          messages: error.messages
        }
      })
  }
}
