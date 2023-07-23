import { Permission } from './permission'
import { User } from './user'

export type Role = {
  readonly id: string
  readonly name: string
  readonly users?: User[]
  readonly permissions?: Permission[]
}
