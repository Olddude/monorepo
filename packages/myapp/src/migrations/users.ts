import { hashSync } from 'bcrypt'
import { db } from 'mylib'
import { v4 } from 'uuid'

export interface User {
  readonly id: string
  readonly username: string
  readonly password: string
}

export async function up(): Promise<void> {
  await db.schema.createTable('users', (table) => {
    table.uuid('id').primary()
    table.string('username').notNullable()
    table.string('password').notNullable()
  })

  const users: User[] = [
    {
      id: v4(),
      username: 'admin',
      password: hashSync('password', 10),
    },
  ]

  await db.batchInsert('users', users)
}

export async function down(): Promise<void> {
  await db.schema.dropTableIfExists('users')
}
