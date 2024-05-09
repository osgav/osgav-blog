
+++
title = "GEOG 868: Mapping the Class Roster"
slug = "mapping-the-class-roster"
date = "2022-08-18T16:15:45Z"
draft = false
type = "blog"
author = "osgav"
image = "images/headers/kelsoknight-unsplash.jpg"
collections = ["blog"]
tags = ["GIS", "SQL", "CLI", "database design", "map design", "cartography",  "PostGIS", "pgcli", "ogr2ogr", "QGIS"]
+++

[![class roster map](/images/posts/class-roster/class-roster-map.png)](/images/posts/class-roster/class-roster-map.png)

In [Lesson 3 of GEOG 868](https://www.e-education.psu.edu/spatialdb/node/1957) I played around with PostgreSQL and PostGIS for the first time. For the project at the end you are given a `class_roster.txt` file that contains a list of students and their postal codes. The task was to join that with data provided earlier in the lesson and then plot the students' locations on a map in QGIS. Here's how I went about doing that. 

<!--more-->

**Project Brief**

The [project brief](https://www.e-education.psu.edu/spatialdb/node/1964) provided some hints and tips about what you should be doing, which I translated into roughly 4 stages:

1. set up a database and schema
2. import the data into the database
3. do the geometry column and join query bit
4. connect QGIS to PostGIS and make a map


**Stage 1: set up a database and schema**

I already had my `Lesson3db` database from working through the lesson, so I used that as there was no particular need to have a separate database for this. However, a separate schema made sense, as this project was a new and different topic to the existing schemas from the lesson (which were `usa` and `nyc_poi`).

```sql
CREATE SCHEMA class_roster
AUTHORIZATION postgres
;
```

**Stage 2: import the data into the database**

Before jumping into this I had a quick ponder, in the form of sketching an ER diagram, about what I was intending to do. The general plan was: 

- table for `students` (names and their postal codes)
- table for `postal_codes` (point geometry of postal code centroids)
- *and I may as well put the counties and states shapefiles in PostGIS too*

A fairly unexciting ER diagram in the end – 4 boxes, 2 of them joined with a line. But a useful exercise nevertheless. 

First up, creating the tables.

Starting with the `postal_codes` table, I took roughly the following steps:

- created `postal_codes` table
- used `pgcli \copy` to insert CSV into `postal_codes` table
- used `AddGeometryColumn()` to add a `geom` column to `postal_codes` table

Then the `students` table, I took roughly the following steps:

- created `students` table (with an ID field)
- created `csv_students` (without an ID field)
- used `pgcli \copy` to insert CSV into `csv_students` table
- used `INSERT ... SELECT` to populate `students` table with contents of `csv_students` table

I say *roughly,* because I forgot about the `\copy` command needing the source CSV and destination table to have the same number of columns, so I `DROP`'d and recreated tables a couple of times. 

I decided the `students` table should have an ID rather than use the student's firstname+lastname as a primary key, so to facilitate that I created the temporary `csv_students` table. My reason for the ID field being "something something future proofing" – like if this was a real school database, you might eventually end up with two people with the same name, so firstname+lastname a good primary key does not make. 

Here is the SQL and pgcli commands I used:

creating `postal_codes` table:

```sql
CREATE TABLE class_roster.postal_codes
(
    code character varying(5),
    lon real,
    lat real,
    PRIMARY KEY (code)
)
;
 
ALTER TABLE IF EXISTS class_roster.postal_codes
OWNER to postgres
;
```

populating `postal_codes` table:

```
\copy class_roster.postal_codes FROM 'postal_codes.txt' WITH (FORMAT csv, HEADER True, QUOTE '"')
```

adding geometry column to `postal_codes` table:

```sql
SELECT AddGeometryColumn('class_roster', 'postal_codes', 'geom', 4269, 'POINT', 2)
;
```

creating `students` table:

```sql
CREATE TABLE class_roster.students
(
    id serial,
    last_name character varying(40),
	first_name character varying(40),
	postal_code character varying(5),
    PRIMARY KEY (id)
)
;

ALTER TABLE IF EXISTS class_roster.students
OWNER to postgres
;
```

creating temporary `csv_students` table:

```sql
CREATE TABLE class_roster.csv_students
(
    last_name character varying(40),
	first_name character varying(40),
	postal_code character varying(5),
)
;

ALTER TABLE IF EXISTS class_roster.csv_students
OWNER to postgres
;
```

populating `csv_students` table:

```
\copy class_roster.csv_students FROM '868_roster_sp2_22.txt' WITH (FORMAT csv, HEADER True, QUOTE '"')
```

populating `students` table:

```sql
INSERT INTO class_roster.students (last_name, first_name, postal_code)
(
  SELECT last_name, first_name, postal_code
  FROM class_roster.csv_students
)
;
```

With all the *necessary* data in the database, I just had the counties and states shapefiles left to import. These could have been added to the QGIS project directly rather than to PostGIS first, but I thought I may as well add them to the database since I figured how to do that [earlier in Lesson 3](/blog/weeknotes-2022-31.html). I did this with `ogr2ogr`:

```
ogr2ogr -f PostgreSQL PG:"host=localhost port=5432 dbname=Lesson3db user=postgres password=......" -lco SCHEMA=class_roster -nlt GEOMETRY counties.shp
```

```
ogr2ogr -f PostgreSQL PG:"host=localhost port=5432 dbname=Lesson3db user=postgres password=......" -lco SCHEMA=class_roster -nlt GEOMETRY -nln states States.shp
```

**Stage 3: do the geometry column and join query bit**

Now for *the geometry column bit.* The hint from the project brief about string concatenation in SQL led me to construct the following `UPDATE` query to populate the `geom` column I added to the `postal_codes` table earlier. 

It builds a text string, such as `POINT(-123.61 41.22)`, and feeds it into the `ST_GeomFromText` PostGIS function which turns it into a geometry object.

```sql
UPDATE class_roster.postal_codes
SET geom = ST_GeomFromText('POINT(' || lon || ' ' || lat || ')')
;
```

Next up is the crux of the exercise. By doing an `INNER JOIN` of the `students` table and the `postal_codes` table on the postal code field, and selecting the student's name and the `geom` field, I get a set of results that gives me the coordinates of the centroid for each student's postal code – that's exactly what I'm trying to map!

```sql
SELECT
  students.last_name || ', ' || students.first_name AS name,
  students.postal_code,
  postal_codes.geom
FROM students
INNER JOIN postal_codes
ON students.postal_code = postal_codes.code
ORDER BY name ASC
;
```

At this point, there are at least two options for mapping the results of that query with QGIS. You could create a table that shows the results of that query, or you could create a *view* that shows the results of that query. 

As the project brief asks you to consider the easier of making updates or insertions to the class roster, a *view* is a better choice than a table. That's because creating a table of the query results would be like a snapshot at the time you created the table, whereas a view is *not* a snapshot and instead consults the source tables it is based on whenever it is run. So, if a new student was added to the `students` table, or a correction made to a postal code (whether that be the stated postal code for a given student in the `students` table, or the location of the centroid for a postal code in `postal_codes` table) the results returned by the *view* would have those updates. 

This is the SQL I used for creating a view:

```sql
CREATE VIEW class_roster.vw_student_postal_codes
AS
SELECT
  students.last_name || ', ' || students.first_name AS name,
  students.postal_code,
  postal_codes.geom
FROM students
INNER JOIN postal_codes
ON students.postal_code = postal_codes.code
ORDER BY name ASC
;

ALTER TABLE class_roster.vw_student_postal_codes
OWNER TO postgres
;
```


**Stage 4: connect QGIS to PostGIS and make a map**

Last up, mapping the data!

I connected QGIS to my PostGIS server (well, it was already connected from earlier, but now my new schema was there too). I added my `vw_student_postal_codes` view / layer to my map, along with counties and states, and tada! Job done. Nearly.

I rather like cartography side of things, so I spent some time making the map look a bit nicer. 

First I changed the projection to one I prefer for the US.

- from EPSG:4269 (NAD83)
- to EPSG:2163 (US National Atlas Equal Area)

Secondly I played around with layer ordering and symbology until the state lines, county lines, and colours were all harmonious. 

Lastly I decided to add labels so you can see which student is from where. This provided an opportunity to try out "leader lines" or "callout lines" – something I knew was in the QGIS Map Design book I bought a few months ago, and had been meaning to experiment with.

[![class roster map](/images/posts/class-roster/class-roster-map.png)](/images/posts/class-roster/class-roster-map.png)
