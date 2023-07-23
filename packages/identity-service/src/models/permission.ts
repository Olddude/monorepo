import { Role } from './role'

export interface Permission {
  readonly id: string
  readonly name: string
  readonly roles?: Role[]
}
