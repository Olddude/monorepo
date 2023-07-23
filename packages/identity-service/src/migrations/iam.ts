import { hashSync } from 'bcrypt'
import { v4 } from 'uuid'
import { User } from '../models/user'
import { Role } from '../models/role'
import { Permission } from '../models/permission'
import { Client } from '../models/client'
import { Scope } from '../models/scope'
import { Resource } from '../models/resource'

const users: User[] = [
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

const roles: Role[] = [
  { id: v4(), name: 'administrator' },
  { id: v4(), name: 'user' },
]

const permissions: Permission[] = [
  { id: v4(), name: 'write' },
  { id: v4(), name: 'read' },
]

// uuid | sed -e 's/-//gi' -> secret generation
const clients: Client[] = [
  {
    id: v4(),
    secret: '42caf3f4295011eeb6777f380c3a1e0d',
    redirectUris: ['http://localhost:8001/swagger'],
    name: 'DomainServiceSwaggerClient',
    description:
      'This is the domains services private swagger ui client from the same origin as the domain service',
    website: 'http://localhost:8001/swagger',
    logo: 'http://localhost:8001/favicon.ico',
  },
  {
    id: v4(),
    secret: 'b33e8ed0294f11eea75c07828775a90f',
    redirectUris: ['http://localhost:3000/callback'],
    name: 'ExpressClient',
    description: 'This is a public expressjs application',
    website: 'http://localhost:3000',
    logo: 'http://localhost:3000/favicon.ico',
  },
  {
    id: v4(),
    secret: '20cb1ff2294311eeb38dd35a0b971cfb',
    redirectUris: ['http://localhost:4200/callback'],
    name: 'AngularClient',
    description: 'This is a public angular application',
    website: 'http://localhost:4200',
    logo: 'http://localhost:4200/favicon.ico',
  },
]

const resources: Resource[] = [
  {
    id: v4(),
    name: '@monorepo/domain-service',
    contactEmail: 'domain-service@theolddude.net',
    description: 'domain service',
    status: 'active',
    website: 'http://localhost:8001',
  },
]

const scopes: Scope[] = [
  {
    id: v4(),
    name: 'write:*',
  },
  {
    id: v4(),
    name: 'read:*',
  },
  {
    id: v4(),
    name: 'delete:*',
  },
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

const userClientScopes = [
  { userId: users[0].id, clientId: clients[0].id, scopeId: scopes[0].id },
  { userId: users[0].id, clientId: clients[0].id, scopeId: scopes[1].id },
  { userId: users[0].id, clientId: clients[0].id, scopeId: scopes[2].id },
]

const resourceScopes = [
  { resourceId: resources[0].id, scopeId: scopes[0].id },
  { resourceId: resources[0].id, scopeId: scopes[1].id },
  { resourceId: resources[0].id, scopeId: scopes[2].id },
]

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

  await db.schema.createTable('clients', (table) => {
    table.uuid('id').primary()
    table.string('secret').notNullable()
    table.specificType('redirectUris', 'text ARRAY').notNullable()
    table.string('name').notNullable().unique()
    table.text('description').notNullable()
    table.string('website').notNullable()
    table.string('logo').notNullable()
  })

  await db.schema.createTable('resources', (table) => {
    table.uuid('id').primary()
    table.string('name').notNullable().unique()
    table.text('description').notNullable()
    table.string('website').notNullable()
    table.string('contactEmail').notNullable()
    table.enu('status', ['active', 'inactive', 'deleted']).defaultTo('active')
  })

  await db.schema.createTable('scopes', (table) => {
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

  await db.schema.createTable('user_client_scopes', (table) => {
    table.uuid('userId').references('id').inTable('users').notNullable()
    table.uuid('clientId').references('id').inTable('clients').notNullable()
    table.uuid('scopeId').references('id').inTable('scopes').notNullable()
    table.primary(['userId', 'clientId', 'scopeId'])
  })

  await db.schema.createTable('resource_scopes', (table) => {
    table.uuid('resourceId').references('id').inTable('resources').notNullable()
    table.uuid('scopeId').references('id').inTable('scopes').notNullable()
    table.primary(['resourceId', 'scopeId'])
  })

  await db.batchInsert('users', users)
  await db.batchInsert('roles', roles)
  await db.batchInsert('permissions', permissions)
  await db.batchInsert('clients', clients)
  await db.batchInsert('resources', resources)
  await db.batchInsert('scopes', scopes)
  await db.batchInsert('user_roles', userRoles)
  await db.batchInsert('role_permissions', rolePermissions)
  await db.batchInsert('user_client_scopes', userClientScopes)
  await db.batchInsert('resource_scopes', resourceScopes)
}

export async function down(db) {
  await db.schema.dropTableIfExists('resource_scopes')
  await db.schema.dropTableIfExists('user_client_scopes')
  await db.schema.dropTableIfExists('user_roles')
  await db.schema.dropTableIfExists('role_permissions')
  await db.schema.dropTableIfExists('scopes')
  await db.schema.dropTableIfExists('resources')
  await db.schema.dropTableIfExists('clients')
  await db.schema.dropTableIfExists('permissions')
  await db.schema.dropTableIfExists('roles')
  await db.schema.dropTableIfExists('users')
}
