import { hashSync } from 'bcrypt'
import { v4 } from 'uuid'

export async function up(db) {
  await db.schema.createTable('users', (table) => {
    table.uuid('id').primary()
    table.string('username').notNullable().unique()
    table.string('password').notNullable()
  })

  await db.schema.createTable('roles', (table) => {
    table.uuid('id').primary()
    table.string('name').notNullable().unique()
  })

  await db.schema.createTable('permissions', (table) => {
    table.uuid('id').primary()
    table.string('name').notNullable().unique()
  })

  await db.schema.createTable('user_roles', (table) => {
    table.uuid('userId').references('id').inTable('users').notNullable()
    table.uuid('roleId').references('id').inTable('roles').notNullable()
    table.primary(['userId', 'roleId'])
  })

  await db.schema.createTable('role_permissions', (table) => {
    table.uuid('roleId').references('id').inTable('roles').notNullable()
    table
      .uuid('permissionId')
      .references('id')
      .inTable('permissions')
      .notNullable()
    table.primary(['roleId', 'permissionId'])
  })

  const users = [
    {
      id: v4(),
      username: 'admin',
      password: hashSync('password', 10),
    },
    {
      id: v4(),
      username: 'guest',
      password: hashSync('guest', 10),
    },
  ]

  const roles = [
    { id: v4(), name: 'admin' },
    { id: v4(), name: 'user' },
  ]

  const permissions = [
    { id: v4(), name: 'write' },
    { id: v4(), name: 'read' },
  ]

  const userRoles = [
    { userId: users[0].id, roleId: roles[0].id },
    { userId: users[1].id, roleId: roles[1].id },
  ]

  const rolePermissions = [
    { roleId: roles[0].id, permissionId: permissions[0].id },
    { roleId: roles[0].id, permissionId: permissions[1].id },
    { roleId: roles[1].id, permissionId: permissions[1].id },
  ]

  await db.batchInsert('users', users)
  await db.batchInsert('roles', roles)
  await db.batchInsert('permissions', permissions)
  await db.batchInsert('user_roles', userRoles)
  await db.batchInsert('role_permissions', rolePermissions)
}

export async function down(db) {
  await db.schema.dropTableIfExists('user_roles')
  await db.schema.dropTableIfExists('role_permissions')
  await db.schema.dropTableIfExists('permissions')
  await db.schema.dropTableIfExists('roles')
  await db.schema.dropTableIfExists('users')
}
