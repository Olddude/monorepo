# @monorepo/identity-service

## Auth

- type: BasicAuth
- username: admin
- password: password

## Swagger

- swagger-ui: http://localhost:8000/swagger
- swagger-json: http://localhost:8000/swagger.json

## Database

### Get all users of a role

```sql
select
	u."id",
	u."username" as "name",
	r."name" as "role"
from users u
inner join user_roles ur on ur."userId" = u."id"
inner join roles r on r."id" = ur."roleId"
where r."name" = 'administrator'
```

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
where u."username" = 'admin'
```

### Get user client scopes

```sql
select
	u."id" as "userId",
	c."id" as "clientId",
	s."name" as "scope"
from users u
inner join user_client_scopes ucs on ucs."userId" = u."id"
inner join clients c on c."id" = ucs."clientId"
inner join scopes s on s."id" = ucs."scopeId"
where u."username" = 'admin'
```
