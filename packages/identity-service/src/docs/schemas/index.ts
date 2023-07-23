import { SuccessSchema } from './shared/success.schema'
import { ErrorSchema } from './shared/error.schema'

import { UserSchema } from './user/user.schema'
import { CreateUserSchema } from './user/create-user.schema'
import { UpdateUserSchema } from './user/update-user.schema'

import { RoleSchema } from './role/role.schema'

export const Schemas = {
  Success: SuccessSchema,
  Error: ErrorSchema,
  User: UserSchema,
  CreateUser: CreateUserSchema,
  UpdateUser: UpdateUserSchema,
  Role: RoleSchema,
}
