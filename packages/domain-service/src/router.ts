import { createRouter } from '@monorepo/core'
import { posts } from './routes/posts'

export const router = createRouter()

router.use(posts)
