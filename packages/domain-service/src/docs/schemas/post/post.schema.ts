export const PostSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'Post unique identifier',
    },
    title: {
      type: 'string',
      description: 'Post title',
    },
    description: {
      type: 'string',
      description: 'Post description',
    },
    content: {
      type: 'string',
      description: 'Post content',
    },
  },
}
