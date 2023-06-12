import { Router } from 'express'
import { AuthRouter } from '@auth/infrastructure/routes/user_routes'
import { PropsRouter } from '@internal-props/infrastructure/routes/propsRouter'

export interface APIType {
  path: string
  controller: Router
}

export default function api (): APIType[] {
  return [
    { path: '/auth', controller: AuthRouter },
    { path: '/props', controller: PropsRouter }
  ]
}
