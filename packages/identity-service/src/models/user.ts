import { Role } from './role'

export type User = {
  readonly id: string
  readonly username: string
  readonly password: string
  readonly roles?: Role[]
}
