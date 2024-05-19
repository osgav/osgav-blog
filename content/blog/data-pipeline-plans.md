
+++
title = "data pipeline plans"
slug = "data-pipeline-plans"
date = "2024-05-19T19:48:04Z"
draft = false
type = "blog"
author = "osgav"
images = ["..."]
collections = ["blog"]
tags = ["data pipeline", "Apache Airflow", "CKAN",  "PostgreSQL", "PostGIS", "python", "web crawler"]
+++

I've been tinkering with a couple of things and toying with another couple of ideas that when all combined form what I would call a *data pipeline.* I quite like the idea of building this data pipeline so I've decided that I shall do just that. 

The things I've been working on already are a web scraper and a database. The other ideas I've been keen to explore are a data portal and an orchestrator. In reverse order the specific technologies are:

- [Apache Airflow](https://airflow.apache.org/)
- [CKAN](https://ckan.org/)
- [PostgreSQL](https://www.postgresql.org/) and [PostGIS](https://postgis.net/)
- [Python](https://www.python.org/)

For the web scraper I'm going to revisit and rewrite the thoroughly unstructured and messy python scripts I wrote for my [UK Freight Transport System](/portfolio/uk-freight-transport-system.html) map data. For the database I'm going to continue working on my [geolab personal PostGIS server](/lab/geolab-postgis-server-manual.html). The CKAN data portal is presently the least explored area, but I like what I see, and look forward to learning more about it. Lastly is Apache Airflow, which will literally tie all the other components together, in theory. As in, it could run the scraper on a schedule, transform its results and stick them in PostGIS, then something something prepare an export suitable for sharing via CKAN? We shall see.

<!--more-->
