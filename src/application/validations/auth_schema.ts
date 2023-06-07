import Joi from 'joi'

export const signupSchema: Joi.ObjectSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email field is required',
    'string.base': 'Format is wrong!',
    'string.email': 'Entry is not Email valid!'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
    'string.base': 'Format entry is wrong'
  }),
  phoneNumber: Joi.string().required().messages({
    'any.required': 'The phone number field is required',
    'string.base': 'the format of the phone number field is incorrect'
  })
})
