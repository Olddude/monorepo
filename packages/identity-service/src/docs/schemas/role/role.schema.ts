export const RoleSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'Role unique identifier',
    },
    name: {
      type: 'string',
      description: 'Role name',
    },
  },
}
