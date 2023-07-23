export type Resource = {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly website: string
  readonly contactEmail: string
  readonly status: 'active' | 'inactive' | 'deleted'
}
