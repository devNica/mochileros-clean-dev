import { Router } from 'express'
import testRouter from './test.router'
import { AuthRouter } from './user_routes'
import { PropsRouter } from './props_routes'

export interface APIType {
  path: string
  controller: Router
}

export default function api (): APIType[] {
  return [
    { path: '/test', controller: testRouter },
    { path: '/auth', controller: AuthRouter },
    { path: '/props', controller: PropsRouter }
  ]
}
