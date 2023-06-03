import { Router } from 'express'

const testRouter = Router()

testRouter.get('/', (_req, res) => {
  res.send('Server is running successfully')
})

export default testRouter
