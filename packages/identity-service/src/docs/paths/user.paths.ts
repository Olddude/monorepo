import { UserParameters } from '../parameters/user.parameters'

export const UserPaths = {
  '/users': {
    get: {
      tags: ['Users'],
      summary: 'Fetches all users from the database',
      responses: {
        '200': {
          description: 'Fetch successful',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ['Users'],
      summary: 'Creates a new user in the database',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CreateUser',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Create successful',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Success',
              },
            },
          },
        },
      },
    },
  },
  '/users/{userId}': {
    get: {
      tags: ['Users'],
      summary: 'Fetches a user from the database by ID',
      parameters: UserParameters,
      responses: {
        '200': {
          description: 'Get successful',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
        '404': {
          description: 'User not found',
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
    put: {
      tags: ['Users'],
      summary: 'Updates a user in the database by ID',
      parameters: UserParameters,
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UpdateUser',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Update successful',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Success',
              },
            },
          },
        },
        '404': {
          description: 'User not found',
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
    delete: {
      tags: ['Users'],
      summary: 'Deletes a user from the database by ID',
      parameters: UserParameters,
      responses: {
        '200': {
          description: 'Delete successful',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Success',
              },
            },
          },
        },
        '404': {
          description: 'User not found',
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
