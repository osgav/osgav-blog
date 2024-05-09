
+++
title = "weeknotes: more NASA"
slug = "weeknotes-2022-31"
date = "2022-08-03T20:34:21Z"
draft = false
type = "weeknotes"
author = "osgav"
image = "images/headers/marianne-bos-unsplash.jpg"
collections = ["blog", "weeknotes"]
tags = ["GIS", "NASA ARSET", "remote sensing", "Google Earth Engine", "ogr2ogr", "CLI"]
+++

A bit of a lull in GEOG 868 progress in the last week, as I crammed the prerequisites for the [NASA ARSET](https://appliedsciences.nasa.gov/join-mission/training/english/arset-satellite-remote-sensing-measuring-urban-heat-islands-and) course I mentioned last week. 
<br><br>
I attended the first session yesterday and enjoyed my second bout of playing with [Google Earth Engine](https://earthengine.google.com/) (GEE), having played with it briefly during one of the prerequisite courses. The remaining sessions are on the 4th, 9th and 11th August, with a homework assignment due by the 25th. There is plenty to learn about the world of remote sensing, to say the least, but I won't be spending too much time focused on it just now. If / when I decide to take my Oxford Uni assignment any further then I'll revisit this stuff. For now I shall be turning my focus back to my spatial database management course.

<!--more-->

Speaking of which, I got a little way into [Lesson 3](https://www.e-education.psu.edu/spatialdb/node/1958) earlier today. I finished setting up my first PostgreSQL database with a PostGIS extension enabled. And got pgadmin4 connected to it. And loaded a couple of shapefiles into it. 

Since I'm doing things on my linux laptop (rather than windows desktop) I spent some time figuring out the `ogr2ogr` command for importing a Shapefile to PostGIS, rather than some `.exe` for windows mentioned in the lesson. That ended up looking like this:

```
ogr2ogr -f PostgreSQL PG:"host=localhost port=5432 dbname=Lesson3db user=postgres password=......" -lco SCHEMA=usa -nlt GEOMETRY -nln cities us_cities.shp
```

I realised after running this that I hadn't added anything to specify the CRS, like I did when importing the first Shapefile via the DB Manager in QGIS. I'm sure that'll come back to bite me later. 

Oh and one more thing, I happened across a useful series of videos for folks like me starting to learn about spatial databases: [PostGIS and OpenStreetMap](https://yewtu.be/playlist?list=PLHWVtzzXLMjJGYfjAjguS-Bm79KowWEI_) from Ryan Lambert (courtesy of [Svelte_mo](https://nitter.net/Svelte_mo/status/1552285599461249030)). 

