
+++
title = "dataset: OS AddressBase"
slug = "dataset-os-addressbase"
date = "2024-05-30T10:24:23Z"
draft = false
type = "lab"
author = "osgav"
images = ["..."]
tags = ["geolab", "Ordnance Survey"]
+++

**`created: 30/05/2024`**<br />
**`updated: 30/05/2024`**

## **dataset source**

**source:**

- https://www.ordnancesurvey.co.uk/products/addressbase

> AddressBase matches 29 million Royal Mail postal address to unique property reference numbers (UPRN), bringing a new dimension to the matched records.

## **loading into geolab**

**connect to geolab database:**

```bash
psql -h localhost -U geolab -d geolab -W
```

**create [source schema](/lab/geolab-postgis-server-manual.html#source-schemas):**

```sql
CREATE SCHEMA __ordnance_survey AUTHORIZATION geolab;
```

**convert field names from `addressbase-header.csv` to lowercase:**

```bash
$ cat addressbase-header.csv | sed s'/,/\n/g' | python -c "import sys; [print(line.strip().lower()) for line in sys.stdin.readlines()]"
uprn
os_address_toid
udprn
organisation_name
department_name
po_box_number
sub_building_name
building_name
building_number
dependent_thoroughfare
thoroughfare
post_town
double_dependent_locality
dependent_locality
postcode
postcode_type
x_coordinate
y_coordinate
latitude
longitude
rpc
country
change_type
la_start_date
rm_start_date
last_update_date
class
```

**create table:**

```sql
CREATE TABLE __ordnance_survey.addressbase_sample_import
(
uprn numeric PRIMARY KEY,
os_address_toid varchar(20),
udprn numeric,
organisation_name varchar(55),
department_name varchar(40),
po_box_number varchar(4),
sub_building_name varchar(25),
building_name varchar(40),
building_number numeric,
dependent_thoroughfare varchar(30),
thoroughfare varchar(30),
post_town varchar(10),
double_dependent_locality varchar(25),
dependent_locality varchar(30),
postcode varchar(7),
postcode_type varchar(1),
x_coordinate numeric,
y_coordinate numeric,
latitude numeric,
longitude numeric,
rpc numeric,
country varchar(1),
change_type varchar(1),
la_start_date varchar(10),
rm_start_date varchar(10),
last_update_date varchar(10),
class varchar(1)
);
```

**stick field names on the data:**

```bash
$ cat addressbase-header.csv sx9090.csv > addressbase.csv
```

**load data into geolab source schema:**

```sql
\copy __ordnance_survey.addressbase_sample_import FROM addressbase.csv WITH (FORMAT csv, HEADER True, QUOTE '"')
```

**create [topic schema](/lab/geolab-postgis-server-manual.html#topic-schemas):**

```sql
CREATE SCHEMA addressbase AUTHORIZATION geolab;
```

**create view:**

N.B. using a view is slower than a table because the geometry is constructed every time the view is queried.

```sql
CREATE VIEW addressbase.sample
 AS
SELECT
  uprn,
  os_address_toid,
  udprn,
  organisation_name,
  department_name,
  po_box_number,
  sub_building_name,
  building_name,
  building_number,
  dependent_thoroughfare,
  thoroughfare,
  post_town,
  double_dependent_locality,
  dependent_locality,
  postcode,
  postcode_type,
  x_coordinate,
  y_coordinate,
  latitude,
  longitude,
  rpc,
  country,
  change_type,
  la_start_date,
  rm_start_date,
  last_update_date,
  class,
  ST_SetSRID(ST_MakePoint(longitude,latitude),4326) AS geom
FROM __ordnance_survey.addressbase_sample_import
;
```

<!--more-->
