const { hashSync } = require('bcrypt')
const { v4 } = require('uuid')

exports.up = async function up(db) {
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

exports.down = async function (db) {
  await db.schema.dropTableIfExists('users')
}
