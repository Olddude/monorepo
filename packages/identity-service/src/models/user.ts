import { Role } from './role'

export interface User {
  readonly id: string
  readonly username: string
  readonly password: string
  readonly roles?: Role[]
}
