import { Router } from 'express'

export interface APIModel {
  path: string
  controller: Router
}
