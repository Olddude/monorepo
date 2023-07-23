export const UserSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'User unique identifier',
    },
    username: {
      type: 'string',
      description: 'User name',
    },
    password: {
      type: 'string',
      description: 'User password',
    },
  },
}
