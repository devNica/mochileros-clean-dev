import { Router } from 'express'
import testRouter from './test.router'

export interface APIType {
  path: string
  controller: Router
}

export default function api (): APIType[] {
  return [
    { path: '/test', controller: testRouter }
  ]
}
