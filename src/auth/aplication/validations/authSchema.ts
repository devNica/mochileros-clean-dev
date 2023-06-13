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

export const kycSchema: Joi.ObjectSchema = Joi.object({
  firstname: Joi.string().required().messages({
    'any.required': 'Firstname is required',
    'string.base': 'Format firtsname is wrong!'
  }),
  lastname: Joi.string().required().messages({
    'any.required': 'Lastname is required!',
    'string.base': 'Format lastname is wrong!'
  }),
  address: Joi.string().required().messages({
    'any.required': 'Address is required',
    'string.base': 'Format address is wrong!'
  }),
  dni: Joi.string().required().messages({
    'any.required': 'DNI is required',
    'string.base': 'Format DNI is wrong!'
  }),
  birthdate: Joi.string().required().messages({
    'any.required': 'Birthdate is required!',
    'string.base': 'Format birthdate is wrong!'
  }),
  fkUser: Joi.string().uuid().required().messages({
    'any.required': 'ForeignKey User is required',
    'string.base': 'Format ForeignKey User is wrong!',
    'uuid.base': 'Format ForeignKey User is wrong!'
  }),
  fkCountry: Joi.number().required().messages({
    'any.required': 'ForeignKey country is required!',
    'number.base': 'Format ForeignKey country is wrong!'
  })
})
