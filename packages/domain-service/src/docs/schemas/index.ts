import { PostSchema } from './post/post.schema'
import { ErrorSchema } from './shared/error.schema'
import { SuccessSchema } from './shared/success.schema'

export const Schemas = {
  Success: SuccessSchema,
  Error: ErrorSchema,
  Post: PostSchema,
}
