
+++
title = "geolab: PostGIS Server Manual"
slug = "geolab-postgis-server-manual"
date = "2023-09-26T13:03:57Z"
draft = false
type = "lab"
author = "osgav"
images = ["..."]
tags = ["geolab", "PostGIS", "geodatabase", "database design"]
+++

**`created: 26/09/2023`**<br />
**`updated: 30/05/2024`**


## **bootstrap geolab database**

see https://github.com/osgav/geolab for scripts


## **start/stop PostgreSQL server**

```bash
sudo systemctl start postgresql
sudo systemctl stop postgresql
```


## **check PostgreSQL version**

you can check the PostgreSQL server version from the command line with:

```bash
postgres --version
```


## **locate PostgreSQL config files and data directory**

once connected to the server you can locate these with:

```sql
SHOW config_file;
SHOW hba_file;
SHOW ident_file;
SHOW data_directory;
```

https://www.postgresql.org/docs/current/runtime-config-file-locations.html

via https://tomcam.github.io/postgres/


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


## **check which role you currently are**

```sql
SELECT current_user;  -- user name of current execution context
SELECT session_user;  -- session user name
```

`current_user` will change if you use `SET ROLE something;`

`session_user` will show who you connected to the database as

via https://stackoverflow.com/a/22502312


## **create new PostGIS database**

**as superadmin `postgres`:**

```bash
postgres=# CREATE DATABASE mydb OWNER postgres;
CREATE DATABASE
postgres=#
postgres=# \c mydb
Password:
You are now connected to database "mydb" as user "postgres".
mydb=#
mydb=# CREATE EXTENSION postgis;
CREATE EXTENSION
mydb=#
```


## **check PostGIS version**

```sql
mydb=# SELECT postgis_full_version();
```


## **allow non-superuser to install extension**

set `trusted = true` in the extension's control file. e.g. for PostGIS that might be located at:

```
/usr/share/pgsql/extension/postgis.control
```

as per https://www.postgresql.org/docs/current/sql-createextension.html

> Loading an extension ordinarily requires the same privileges that would be required to create its component objects. For many extensions this means superuser privileges are needed. However, if the extension is marked _trusted_ in its control file, then it can be installed by any user who has `CREATE` privilege on the current database. In this case the extension object itself will be owned by the calling user, but the contained objects will be owned by the bootstrap superuser (unless the extension's script explicitly assigns them to the calling user). This configuration gives the calling user the right to drop the extension, but not to modify individual objects within it.


## **create schema**

```sql
CREATE SCHEMA myschema AUTHORIZATION postgres;
```


## **schema naming convention**

**(work in progress)**

#### **SOURCE schemas**

- are for **new external datasets**
- name should be based on data provider
- name should be prefixed with double underscore `__`
- should *almost* always have an associated **topic schema**
  - which exists to give a meaningful name to the dataset
  - and should contain at least one view pointed at the source schema

#### **TOPIC schemas**

- are for **new datasets created by you**
- or to provide a meaningful name for a **source schema**
- name should represent the subject or theme of the data inside
- projects can create things in here
  - but **not if it involves joining data from outside the schema**

#### **PROJECT schemas**

- are for projects that want to **join data from different schemas**
- name should be prefixed with single underscore `_`


## **create table for test purposes**

```sql
CREATE TABLE schema.table (gid serial PRIMARY KEY, name varchar(5));
```


## **create table with geometry column**

```sql
CREATE TABLE schema.table
(
gid serial,
name character varying(50),
PRIMARY KEY (gid)
);
```

```sql
SELECT AddGeometryColumn('schema', 'table', 'geom', 4326, 'POINT', 2);
```

- `geom` is the name of the new geometry column you're adding
- `4326` is the SRID for WGS84, geographic coordinate reference system (lat / lon)
- `2` is for a column storing X and Y coordinates
- `3` would be for storing X, Y and Z coordinates (or X, Y and M if type is `POINTM`)


## **load CSV with psql**

```bash
\copy schema.table FROM '/path/to/data.csv' WITH (FORMAT csv, HEADER True, QUOTE '"')
```

examples:

- [dataset: Global Powerplants](/lab/dataset-global-powerplants.html)
- [dataset: OS AddressBase](/lab/dataset-os-addressbase.html)
- [dataset: Supermarket Retail Points](/lab/dataset-supermarket-retail-points.html)


## **populate geometry column from CSV**

this assumes that `table` has columns called `latitude` and `longitude`

using `ST_GeomFromText`:

```sql
UPDATE schema.table
SET geom = ST_GeomFromText('POINT(' || longitude || ' ' || latitude || ')')
;
```

using `ST_MakePoint`:

```sql
UPDATE schema.table
SET geom = ST_SetSRID(ST_MakePoint(longitude,latitutde),4326)
;
```


## **use ogr2ogr to load Shapefile**

```bash
ogr2ogr \
  -nln new_layer_name_aka_table_name \
  -nlt PROMOTE_TO_MULTI \
  -lco SCHEMA=myschema \
  -lco GEOMETRY_NAME=geom \
  -lco PRECISION=no \
  pg:"dbname=geolab host=localhost port=5432 user=geolab password=..." \
  myshapefile.shp
```


## **use ogr2ogr to load GeoPackage**

```bash
ogr2ogr \
  -nln new_layer_name_aka_table_name \
  -nlt PROMOTE_TO_MULTI \
  -lco SCHEMA=myschema \
  -lco GEOMETRY_NAME=geom \
  -lco PRECISION=no \
  pg:"dbname=geolab host=localhost port=5432 user=geolab password=..." \
  mygeopackage.gpkg \
  layer_name_in_geopackage
```


## **use ogr2ogr to load GeoJSON**

```bash
ogr2ogr \
  -nln new_layer_name_aka_table_name \
  -nlt PROMOTE_TO_MULTI \
  -lco SCHEMA=myschema \
  -lco GEOMETRY_NAME=geom \
  -lco PRECISION=no \
  pg:"dbname=geolab host=localhost port=5432 user=geolab password=..." \
  mygeojsondata.geojson \
  layer_name_in_geojson
```


## **ogr2ogr options**

- https://gdal.org/programs/ogr2ogr.html
- https://gdal.org/drivers/vector/index.html
- https://gdal.org/drivers/vector/pg.html#vector-pg

`-nln` = new layer name (aka table name)

`-nlt` = new layer type

`-lco` = layer creation option


## **other resources**

https://github.com/geographyclub/postgis-cookbook
