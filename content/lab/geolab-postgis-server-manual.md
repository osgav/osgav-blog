
+++
title = "geolab: PostGIS Server Manual"
slug = "geolab-postgis-server-manual"
date = "2023-09-26T13:03:57Z"
draft = false
type = "lab"
author = "osgav"
images = ["..."]
tags = ["PostGIS", "geodatabase", "database design"]
+++

**`created: 26/09/2023`**<br />
**`updated: 26/09/2023`**


## **start/stop PostgreSQL server**

```bash
sudo systemctl start postgresql
sudo systemctl stop postgresql
```


## **connect to server with psql**

**as superadmin `postgres`:**

```bash
psql -h localhost -U postgres -W postgres
Password:
psql (13.4)
Type "help" for help.

postgres=#
```

- `-h` for hostname
- `-U` for username
- `-W` to prompt for password
- `postgres` at the end is the name of the database to connect to


## **psql commands**

- `\?` to display psql commands help
- `\dg` to `list roles` to see other users you can login as
- `\l` to `list databases` to see other databases you can connect to
- `\c mydb` to connect to a database called "mydb"
- `\dn` to `list schemas` in the current database
- `\dt myschema.*` to `list tables` in the schema called "myschema"
- `\dv` to `list views` 

update the `search_path` to have `\dt` list tables in your schema without specifying it:

```sql
SET search_path TO myschema, public;
SHOW search_path;
```
