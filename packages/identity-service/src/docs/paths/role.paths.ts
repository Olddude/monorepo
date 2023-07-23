import { RoleParameters } from '../parameters/role.parameters'

export const RolePaths = {
  '/roles': {
    get: {
      tags: ['Roles'],
      summary: 'Fetches all roles from the database',
      responses: {
        '200': {
          description: 'Fetch successful',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Role',
                },
              },
            },
          },
        },
      },
    },
  },
  '/roles/{roleId}': {
    get: {
      tags: ['Roles'],
      summary: 'Fetches a role from the database by ID',
      parameters: RoleParameters,
      responses: {
        '200': {
          description: 'Get successful',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Role',
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
