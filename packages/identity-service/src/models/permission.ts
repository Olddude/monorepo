import { Role } from './role'

export type Permission = {
  readonly id: string
  readonly name: string
  readonly roles?: Role[]
}
