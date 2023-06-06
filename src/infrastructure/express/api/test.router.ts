import { Router } from 'express'

const testRouter = Router()

testRouter.get('/', (_req, res) => {
  res.status(200).json({ message: 'Server is OK' })
})

export default testRouter
