import { HttpResponseAdapter } from '@infrastructure/adapters/http_response_adapter'
import { Router } from 'express'

const testRouter = Router()

testRouter.get('/', (_req, _res, next) => {
  next(HttpResponseAdapter.response({}, 'successRequest', 'Server is functionally correct'))
})

export default testRouter
