
+++
title = "dataset: Supermarket Retail Points"
slug = "dataset-supermarket-retail-points"
date = "2024-05-30T13:23:49Z"
draft = false
type = "lab"
author = "osgav"
images = ["..."]
collections = ["lab"]
tags = ["geolab", "Geolytix"]
+++

**`created: 30/05/2024`**<br />
**`updated: 30/05/2024`**

## **dataset source**

**source:**

- https://geolytix.com/blog/supermarket-retail-points/

> Retail Points is a comprehensive data set of supermarket and convenience store locations across the UK. Geolytix release this as open data allowing for unrestricted use, no licensing requirements and without cost.

## **loading into geolab**

**connect to geolab database:**

```bash
psql -h localhost -U geolab -d geolab -W
```

**create [source schema](/lab/geolab-postgis-server-manual.html#source-schemas):**

```sql
CREATE SCHEMA __geolytix AUTHORIZATION geolab;
```

**create table:**

```sql
CREATE TABLE __geolytix.supermarket_retail_points_import
(
id numeric PRIMARY KEY,
retailer varchar(36),
fascia varchar(29),
store_name varchar(60),
add_one varchar(76),
add_two varchar(34),
town varchar(41),
suburb varchar(28),
postcode varchar(8),
long_wgs numeric,
lat_wgs numeric,
bng_e numeric,
bng_n numeric,
pqi varchar(28),
open_date varchar(8),
size_band varchar(38),
county varchar(24)
);
```

**load data into geolab source schema:**

```sql
\copy __geolytix.supermarket_retail_points_import FROM 'geolytix_retailpoints_v31_202403.csv' WITH (FORMAT csv, HEADER True, QUOTE '"')
```

**create [topic schema](/lab/geolab-postgis-server-manual.html#topic-schemas):**

```sql
CREATE SCHEMA supermarkets AUTHORIZATION geolab;
```

**create view:**

N.B. using a view is slower than a table because the geometry is constructed every time the view is queried.

```sql
CREATE VIEW supermarkets.all
 AS
SELECT
  id,
  retailer,
  fascia,
  store_name,
  add_one,
  add_two,
  town,
  suburb,
  postcode,
  long_wgs,
  lat_wgs,
  bng_e,
  bng_n,
  pqi,
  open_date,
  size_band,
  county,
  ST_SetSRID(ST_MakePoint(long_wgs,lat_wgs),4326) AS geom
FROM __geolytix.supermarket_retail_points_import
;
```

<!--more-->
