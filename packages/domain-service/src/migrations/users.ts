import { v4 } from 'uuid'
import { Post } from '../models/post'

const posts: Post[] = [
  {
    id: v4(),
    title: 'My first post',
    description: 'This is my first post',
    content: 'Lorem Ipsum 1',
  },
  {
    id: v4(),
    title: 'My second post',
    description: 'This is my second post',
    content: 'Lorem Ipsum 2',
  },
]

export async function up(db) {
  await db.schema.createTable('posts', (table) => {
    table.uuid('id').primary()
    table.string('title').notNullable()
    table.string('description').notNullable()
    table.text('content').notNullable()
  })

  await db.batchInsert('posts', posts)
}

export async function down(db) {
  await db.schema.dropTableIfExists('posts')
}
