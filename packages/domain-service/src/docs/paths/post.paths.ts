import { PostParameters } from '../parameters/post.parameters'

export const PostPaths = {
  '/posts': {
    get: {
      tags: ['Posts'],
      summary: 'Fetches all posts from the database',
      responses: {
        '200': {
          description: 'Fetch successful',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Post',
                },
              },
            },
          },
        },
      },
    },
  },
  '/posts/{postId}': {
    get: {
      tags: ['Posts'],
      summary: 'Fetches a post from the database by ID',
      parameters: PostParameters,
      responses: {
        '200': {
          description: 'Get successful',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Post',
              },
            },
          },
        },
        '404': {
          description: 'Role not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
      },
    },
  },
}
