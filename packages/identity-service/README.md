# @monorepo/identity-service

## Auth

- type: BasicAuth
- username: admin
- password: password

## Swagger

- swagger-ui: http://localhost:8000/swagger
- swagger-json: http://localhost:8000/swagger.json

## Database

### Get user permissions

```sql
select
	u."id",
	u."username" as "name",
	r."name" as "role",
	p."name" as "permission"
from users u
inner join user_roles ur on ur."userId" = u."id"
inner join roles r on r."id" = ur."roleId"
inner join role_permissions rp on rp."roleId" = r."id"
inner join permissions p on p."id" = rp."permissionId"
```
