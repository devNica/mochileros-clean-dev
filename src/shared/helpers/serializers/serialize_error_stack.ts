import { JoiErrorDetailsModel } from '@application/ports/validation/joi_validation'

export const serializeErrorStack = (stack: JoiErrorDetailsModel[]): string => {
  return stack.map(e => e.message).join(',')
}
