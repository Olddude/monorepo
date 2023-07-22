import { hashSync } from 'bcrypt'
import { v4 } from 'uuid'

export async function up(db) {
  await db.schema.createTable('users', (table) => {
    table.uuid('id').primary()
    table.string('username').notNullable()
    table.string('password').notNullable()
  })

  const users = [
    {
      id: v4(),
      username: 'admin',
      password: hashSync('password', 10),
    },
  ]

  await db.batchInsert('users', users)
}

export async function down(db) {
  await db.schema.dropTableIfExists('users')
}
