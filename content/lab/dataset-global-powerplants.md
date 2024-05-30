
+++
title = "dataset: Global Powerplants"
slug = "dataset-global-powerplants"
date = "2024-05-28T14:55:03Z"
draft = false
type = "lab"
author = "osgav"
images = ["..."]
tags = ["geolab"]
+++

**`created: 28/05/2024`**<br />
**`updated: 28/05/2024`**

## **dataset source**

**source:** 

- https://www.wri.org/research/global-database-power-plants
- https://datasets.wri.org/dataset/globalpowerplantdatabase

**via:** [Simon Willison](https://simonwillison.net) / https://global-power-plants.datasettes.com/

from the WRI page:

> The Global Power Plant Database is a comprehensive, open source database of power plants around the world. It centralizes power plant data to make it easier to navigate, compare and draw insights for one’s own analysis. The database covers approximately 30,000 power plants from 164 countries and includes thermal plants (e.g. coal, gas, oil, nuclear, biomass, waste, geothermal) and renewables (e.g. hydro, wind, solar). Each power plant is geolocated and entries contain information on plant capacity, generation, ownership, and fuel type. It will be continuously updated as data becomes available.

from https://github.com/wri/global-power-plant-database (the code used to create it):

> This project is not currently maintained by WRI. There are no planned updates as of this time (early 2022). The last version of this database is version 1.3.0. If we learn of active forks or maintained versions of the code and database we will attempt to provide links in the future.

## **loading into geolab**

**connect to geolab database:**

```bash
psql -h localhost -U geolab -d geolab -W
```

**create [source schema](/lab/geolab-postgis-server-manual.html#source-schemas):**

```sql
CREATE SCHEMA __world_resources_institute AUTHORIZATION geolab;
```

**create table:**

N.B. note the `rowid` field. this is present in an export from Simon's datasette, but it will not be present in the download from WRI.

```sql
CREATE TABLE __world_resources_institute.global_powerplants_import
(
rowid numeric PRIMARY KEY,
country varchar(3),
country_long varchar(32),
name varchar(87),
gppd_idnr varchar(12),
capacity_mw numeric,
latitude numeric,
longitude numeric,
primary_fuel varchar(14),
other_fuel1 varchar(12),
other_fuel2 varchar(7),
other_fuel3 varchar(7),
commissioning_year numeric,
owner varchar(140),
source varchar(73),
url varchar(795),
geolocation_source varchar(83),
wepp_id varchar(25),
year_of_capacity_data numeric,
generation_gwh_2013 numeric, 
generation_gwh_2014 numeric, 
generation_gwh_2015 numeric, 
generation_gwh_2016 numeric, 
generation_gwh_2017 numeric, 
generation_gwh_2018 numeric, 
generation_gwh_2019 numeric, 
generation_data_source varchar(73), 
estimated_generation_gwh_2013 numeric, 
estimated_generation_gwh_2014 numeric, 
estimated_generation_gwh_2015 numeric, 
estimated_generation_gwh_2016 numeric, 
estimated_generation_gwh_2017 numeric, 
estimated_generation_note_2013 varchar(15),
estimated_generation_note_2014 varchar(15), 
estimated_generation_note_2015 varchar(15), 
estimated_generation_note_2016 varchar(15),
estimated_generation_note_2017 varchar(18)
);
```

**load data into geolab source schema:**

```sql
\copy __world_resources_institute.global_powerplants_import FROM 'global-power-plants.csv' WITH (FORMAT csv, HEADER True, QUOTE '"')
```

**create [topic schema](/lab/geolab-postgis-server-manual.html#topic-schemas):**

```sql
CREATE SCHEMA powerplants AUTHORIZATION geolab;
```

**create view:**

N.B. using a view is slower than a table because the geometry is constructed every time the view is queried.

```sql
CREATE VIEW powerplants.global
 AS
SELECT 
  rowid,
  country,
  country_long,
  name,
  gppd_idnr,
  capacity_mw,
  latitude,
  longitude,
  primary_fuel,
  other_fuel1,
  other_fuel2,
  other_fuel3,
  commissioning_year,
  owner,
  source,
  url,
  geolocation_source,
  wepp_id,
  year_of_capacity_data,
  generation_gwh_2013,
  generation_gwh_2014,
  generation_gwh_2015,
  generation_gwh_2016,
  generation_gwh_2017,
  generation_gwh_2018,
  generation_gwh_2019,
  generation_data_source,
  estimated_generation_gwh_2013,
  estimated_generation_gwh_2014,
  estimated_generation_gwh_2015,
  estimated_generation_gwh_2016,
  estimated_generation_gwh_2017,
  estimated_generation_note_2013,
  estimated_generation_note_2014,
  estimated_generation_note_2015,
  estimated_generation_note_2016,
  estimated_generation_note_2017,
  ST_SetSRID(ST_MakePoint(longitude,latitude),4326) AS geom
FROM __world_resources_institute.global_powerplants_import
;
```

<!--more-->
