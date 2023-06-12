import Joi from 'joi'

export const registerCustomerSchema: Joi.ObjectSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.base': 'Format email is wrong!',
    'string.email': 'Email address is wrong!'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required!',
    'string.base': 'Format password is wrong!'
  }),
  phoneNumber: Joi.string().required().messages({
    'any.required': 'Phone number is required!',
    'string.base': 'Format phone number is wrong'
  })
})

export const loginCustomerSchema: Joi.ObjectSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.base': 'Format email is wrong!',
    'string.email': 'Email address is wrong!'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required!',
    'string.base': 'Format password is wrong!'
  })
})
