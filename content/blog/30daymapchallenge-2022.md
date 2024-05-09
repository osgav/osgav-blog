
+++
title = "30DayMapChallenge 2022"
slug = "30daymapchallenge-2022"
date = "2022-12-19T14:11:29Z"
draft = false
type = "blog"
author = "osgav"
images = ["images/posts/30dmc/2022/fullres/all.jpg"]
collections = ["blog"]
tags = ["30DayMapChallenge", "cartography", "map design", "GIS", "QGIS", "visidata"]
+++

Last month I took part in my first [30DayMapChallenge](https://30daymapchallenge.com/) – a daily mapmaking challenge that takes place in November each year.

<!--more-->

This was my first time following the challenge live on Twitter (and Mastodon). My first encounter with the challenge was earlier in the year, through blog posts on some personal websites I stumbled across. They showcased the maps they had made and how they went about it. I've included a few links to such blog posts at the end if you're hungry for more.

I had a lot of fun and saw a lot of amazing maps from everyone taking part. I thoroughly surprised myself by posting on 20 of 30 days – I thought I'd only make a handful or so!

These were the daily themes from 30DayMapChallenge 2022:

![30DayMapChallenge 2022 daily themes](/images/posts/30dmc/2022/30dmc-2022-themes.png "30DayMapChallenge 2022 daily themes")

And these were the maps I made...

<br><br>
# Powerplant Pastels

[![Powerplant Pastels](/images/posts/30dmc/2022/01-points.jpg "Day 1: Points")](/images/posts/30dmc/2022/fullres/01-points.jpg)



**Data:** [Global Power Plants](https://global-power-plants.datasettes.com) via [Datasette](https://datasette.io/examples)
<br>**Tools:** QGIS
<br>**Techniques:** graduated symbol based on size (`capacity_mw` field), and an expression to vary the colour (`primary_fuel` field)
<br>**Related Links:** Alasdair Rae https://www.statsmapsnpix.com/2022/10/cometmaps.html (for the expression) and Cynthia Brewer https://colorbrewer2.org/#type=qualitative&scheme=Pastel1&n=9
<br>**Social Media:** view on [Twitter](https://twitter.com/ZER0D0TS/status/1587541641379954690) or [Mastodon](https://vis.social/@osgav/109354534870199233)

<br><br>
# House for sale

[![House for sale](/images/posts/30dmc/2022/02-lines.png "Day 2: Lines")](/images/posts/30dmc/2022/fullres/02-lines.png)

**Data:** © [OpenStreetMap](https://www.openstreetmap.org/) contributors
<br>**Tools:** QGIS, OSMDownloader plugin
<br>**Techniques:** categorized symbol based on `highway` field (primary, secondary, all others)
<br>**Social Media:** view on [Twitter](https://twitter.com/ZER0D0TS/status/1587929064903417857) or [Mastodon](https://vis.social/@osgav/109361158916760269)

<br><br>
# Bounding Boxes

[![Bounding Boxes](/images/posts/30dmc/2022/03-polygons.jpg "Day 3: Polygons")](/images/posts/30dmc/2022/fullres/03-polygons.jpg)

**Data:** [Natural Earth](https://www.naturalearthdata.com/)
<br>**Tools:** QGIS, Globe Builder plugin
<br>**Techniques:** Vector geometry > Bounding boxes on Natural Earth Admin 1 polygons, played with Layer Rendering Blending Modes on both layers and features
<br>**Inspiration:** Jason Davies https://www.jasondavies.com/maps/bounds/ for the general idea, and Anita Graser / Gretchen Peterson https://locatepress.com/book/qmd2 page 87 for Halo / Hemisphere styling
<br>**Social Media:** view on [Twitter](https://twitter.com/ZER0D0TS/status/1588223020455415810) or [Mastodon](https://vis.social/@osgav/109365147513314234)

<br><br>
# Access Granted

[![Access Granted](/images/posts/30dmc/2022/04-green.jpg "Day 4: Colour Friday: Green")](/images/posts/30dmc/2022/fullres/04-green.jpg)

**Data:** [Natural Earth](https://www.naturalearthdata.com/)
<br>**Tools:** QGIS
<br>**Related Links:** https://yewtu.be/watch?v=0PxTAn4g20U
<br>**Social Media:** view on [Twitter](https://twitter.com/ZER0D0TS/status/1588569664015446017) or [Mastodon](https://vis.social/@osgav/109369956756145587)

<br><br>
# Scotland

[![Scotland](/images/posts/30dmc/2022/07-raster.png "Day 7: Raster")](/images/posts/30dmc/2022/fullres/07-raster.png)

**Data:** [Scottish Government](https://scotgov.maps.arcgis.com), specifically [this dataset](https://scotgov.maps.arcgis.com/home/item.html?id=b1a35a8618a541cea8efe40354e9f156)
<br>**Tools:** QGIS
<br>**Techniques:** playing around with IDW Interpolation on the `altitude` field
<br>**Social Media:** view on [Twitter](https://twitter.com/ZER0D0TS/status/1589725347733721088) or [Mastodon](https://vis.social/@osgav/109388269129328325)

<br><br>
# Amsterdam

[![Amsterdam](/images/posts/30dmc/2022/08-data-openstreetmap.jpg "Day 8: Data: OpenStreetMap")](/images/posts/30dmc/2022/fullres/08-data-openstreetmap.jpg)

**Data:** © [OpenStreetMap](https://www.openstreetmap.org/) contributors
<br>**Tools:** QGIS, QuickOSM plugin
<br>**Techniques:** hitting Shuffle Random Colours until I liked what I saw
<br>**Inspiration:** I had been looking at the links below and wanted a colour palette along those lines
<br>**Related Links:** https://lexica.art/?q=cyberpunk and https://lexica.art/?q=neuromancer
<br>**Social Media:** view on [Twitter](https://twitter.com/ZER0D0TS/status/1590026714771750912) or [Mastodon](https://vis.social/@osgav/109392644039827425)

<br><br>
# UFO sightings in Ukraine

[![UFO sightings in Ukraine](/images/posts/30dmc/2022/10-a-bad-map.jpg "Day 10: A bad map")](/images/posts/30dmc/2022/fullres/10-a-bad-map.jpg)

**Data:** [Natural Earth](https://www.naturalearthdata.com/), Bing VirtualEarth, [NUFORC](https://github.com/planetsig/ufo-reports)
<br>**Tools:** QGIS
<br>**Techniques:** lol
<br>**Inspiration:** UFO data via [a map I saw the day before](https://gitlab.com/jstillh/30DayMapChallenge_2022/-/blob/main/day_9_space/day_9.R) 
<br>**Nota bene:** this was my map for Day 10: A bad map. I decided to blend together maps I'd missed so far so it also includes Days 5, 6, and 9 (Ukraine, Network, and Space).
<br>**Social Media:** view on [Twitter](https://twitter.com/ZER0D0TS/status/1590677824134090752) or [Mastodon](https://vis.social/@osgav/109406828129081710)

<br><br>
# Alert

[![Alert](/images/posts/30dmc/2022/11-red.jpg "Day 11: Colour Friday: Red")](/images/posts/30dmc/2022/fullres/11-red.jpg)

**Data:** [Natural Earth](https://www.naturalearthdata.com/)
<br>**Tools:** QGIS
<br>**Inspiration:** my Access Granted map for Day 4: Colour Friday: Green (I decided to give all the Colour Fridays a similar look)
<br>**Social Media:** view on [Twitter](https://twitter.com/ZER0D0TS/status/1591064730776391681) or [Mastodon](https://vis.social/@osgav/109411660089416213)

<br><br>
# Southern Portugal

[![Southern Portugal](/images/posts/30dmc/2022/12-scale.jpg "Day 12: Scale")](/images/posts/30dmc/2022/fullres/12-scale.jpg)

**Data:** © [OpenStreetMap](https://www.openstreetmap.org/) contributors, [Natural Earth](https://www.naturalearthdata.com/), [geoBoundaries](https://www.geoboundaries.org/)
<br>**Tools:** QGIS
<br>**Techniques:** Lock layers, Lock styles for layers, and Overviews
<br>**Social Media:** view on [Twitter](https://twitter.com/ZER0D0TS/status/1591515985072242688) or [Mastodon](https://vis.social/@osgav/109416827660315818)

<br><br>
# 5 minutes in Lisbon

[![5 minutes in Lisbon](/images/posts/30dmc/2022/13-5-minute-map.jpg "Day 13: 5 minute map")](/images/posts/30dmc/2022/fullres/13-5-minute-map.jpg)

**Data:** © [OpenStreetMap](https://www.openstreetmap.org/) contributors
<br>**Tools:** QGIS
<br>**Techniques:** Network Analysis > Service area (from point), distance based using walking speed of 5km/h
<br>**Inspiration:** the many isochrone maps I'd seen in the last year or so, decided to have a go at making one
<br>**Related Links:** Cynthia Brewer https://colorbrewer2.org/#type=qualitative&scheme=Paired&n=10
<br>**Social Media:** view on [Twitter](https://twitter.com/ZER0D0TS/status/1591854680023658496) or [Mastodon](https://vis.social/@osgav/109423514915266647)

<br><br>
# Powerplant Density

[![Powerplant Density](/images/posts/30dmc/2022/14-hexagons.jpg "Day 14: Hexagons")](/images/posts/30dmc/2022/fullres/14-hexagons.jpg)

**Data:** [Global Power Plants](https://global-power-plants.datasettes.com) via [Datasette](https://datasette.io/examples), [Project Linework](https://www.projectlinework.org/)
<br>**Tools:** QGIS
<br>**Techniques:** Vector Analysis > Count points in polygon
<br>**Related Links:** https://freegistutorial.com/create-spatial-index-on-qgis/ (this sped things up considerably) and https://www.gislounge.com/using-qgis-create-hexbin-map-gisp-registrations/
<br>**Social Media:** view on [Twitter](https://twitter.com/ZER0D0TS/status/1592218273546108929) or [Mastodon](https://vis.social/@osgav/109426980160283370)

<br><br>
# World Port Index

[![World Port Index](/images/posts/30dmc/2022/16-minimal.jpg "Day 16: Minimal")](/images/posts/30dmc/2022/fullres/16-minimal.jpg)

**Data:** [World Port Index](https://data.humdata.org/dataset/world-port-index)
<br>**Tools:** [VisiData](https://www.visidata.org/), InkScape
<br>**Inspiration:** the ability to make graphs per [this demo](https://yewtu.be/watch?v=N1CBDTgGtOU)
<br>**Related Links:** https://www.visidata.org/docs/graph/
<br>**Social Media:** view on [Twitter](https://twitter.com/ZER0D0TS/status/1592852162308374528) or [Mastodon](https://vis.social/@osgav/109437881295220030)

<br><br>
# Rose Street Pub Crawl

[![Rose Street Pub Crawl](/images/posts/30dmc/2022/17-a-map-without-a-computer.jpg "Day 17: A map without a computer")](/images/posts/30dmc/2022/fullres/17-a-map-without-a-computer.jpg)

**Data:** © [OpenStreetMap](https://www.openstreetmap.org/) contributors, Google Maps
<br>**Tools:** paper, pencil, ruler, pens
<br>**Techniques:** a little bit of maths and then looking at the screen, then the paper, then back at the screen, then back at the paper...
<br>**Social Media:** view on [Twitter](https://twitter.com/ZER0D0TS/status/1593347452396003328) or [Mastodon](https://vis.social/@osgav/109444265406999021)

<br><br>
# Sonar Activated

[![Sonar Activated](/images/posts/30dmc/2022/18-blue.jpg "Day 18: Colour Friday: Blue")](/images/posts/30dmc/2022/fullres/18-blue.jpg)

**Data:** [Natural Earth](https://www.naturalearthdata.com/)
<br>**Tools:** QGIS
<br>**Inspiration:** my Access Granted and Alert maps for the previous Colour Fridays
<br>**Social Media:** view on [Twitter](https://twitter.com/ZER0D0TS/status/1593602476124655618) or [Mastodon](https://vis.social/@osgav/109451124321122624)

<br><br>
# The Information Superhighway

[![The Information Superhighway](/images/posts/30dmc/2022/19-globe.jpg "Day 19: Globe")](/images/posts/30dmc/2022/fullres/19-globe.jpg)

**Data:** [Natural Earth](https://www.naturalearthdata.com/), [TeleGeography](https://github.com/telegeography/www.submarinecablemap.com) (they shutdown this repo between last month and now it seems, their [FAQ](https://www2.telegeography.com/submarine-cable-faqs-frequently-asked-questions) states they no longer maintain and update a repo on GitHub, so I guess https://www.submarinecablemap.com/ itself is the source for it now)
<br>**Tools:** QGIS, Globe Builder plugin
<br>**Techniques:** styled globe the same as Bounding Boxes from Day 4, styled cables using the colours provided by TeleGeography
<br>**Inspiration:** submarine cable data via [a map I saw earlier in the month](https://nitter.net/Julian_H0ffmann/status/1589233071504883713)
<br>**Social Media:** view on [Twitter](https://twitter.com/ZER0D0TS/status/1593910293784043521) or [Mastodon](https://vis.social/@osgav/109455475973976592)

<br><br>
# Zamboni

[![Zamboni](/images/posts/30dmc/2022/20-my-favourite.jpg "Day 20: My favorite...")](/images/posts/30dmc/2022/fullres/20-my-favourite.jpg)

**Data:** [Natural Earth](https://www.naturalearthdata.com/), [Zamboni](https://zamboni.com)
<br>**Tools:** QGIS
<br>**Inspiration:** some very artful maps from [@MapsbyW](https://nitter.net/MapsbyW) earlier in the month inspired me to have a go at something different
<br>**Related Links:** https://www.esri.com/arcgis-blog/products/mapping/mapping/steal-these-vignettes-please/
<br>**Social Media:** view on [Twitter](https://twitter.com/ZER0D0TS/status/1594395919000424449) or [Mastodon](https://vis.social/@osgav/109461047920777157)

<br><br>
# Manhattan Bus Routes

[![Manhattan Bus Routes](/images/posts/30dmc/2022/23-movement.jpg "Day 23: Movement")](/images/posts/30dmc/2022/fullres/23-movement.jpg)

**Data:** [Metropolitan Transportation Authority](http://web.mta.info/developers/developer-data-terms.html#data) (look for "Bus GIS Shapefiles")
<br>**Tools:** QGIS
<br>**Techniques:** set line style to Neon, remove inner glow, decrease width, change layer rendering blend mode for Feature to Addition, change colour to MTA blue
<br>**Inspiration:** a similar style of map I saw once, and a tweet from [@helenmakesmaps](https://nitter.net/helenmakesmaps) about blend modes
<br>**Related Links:** https://www.helenmakesmaps.com/post/how-to-use-blending-modes-in-mapping
<br>**Social Media:** view on [Twitter](https://twitter.com/ZER0D0TS/status/1595351830229401601) or [Mastodon](https://vis.social/@osgav/109477892556200855)

<br><br>
# Tuskchester

[![Tuskchester](/images/posts/30dmc/2022/24-fantasy.jpg "Day 24: Fantasy")](/images/posts/30dmc/2022/fullres/24-fantasy.jpg)

**Data:** fictional
<br>**Tools:** https://watabou.github.io/city-generator/
<br>**Techniques:** play with all the settings
<br>**Social Media:** view on [Twitter](https://twitter.com/ZER0D0TS/status/1595756115534311424) or [Mastodon](https://vis.social/@osgav/109483197241603548)

<br><br>
# Shetland Islands

[![Shetland Islands](/images/posts/30dmc/2022/26-islands.jpg "Day 26: Island(s)")](/images/posts/30dmc/2022/fullres/26-islands.jpg)

**Data:** [geoBoundaries](https://www.geoboundaries.org/)
<br>**Tools:** QGIS
<br>**Techniques:** played with the python function from bbecquet (link below)
<br>**Inspiration:** https://mapstodon.space/@acrobins/109409424691052116
<br>**Related Links:** https://bbecquet.net/articles/2021/07/waterlining-in-qgis/
<br>**Social Media:** view on [Twitter](https://twitter.com/ZER0D0TS/status/1596572837355335680) or [Mastodon](https://vis.social/@osgav/109495060460811777)

<br><br>
# Remix

[![Remix](/images/posts/30dmc/2022/30-remix.jpg "Day 30: Remix")](/images/posts/30dmc/2022/fullres/30-remix.jpg)

**Data:** [Natural Earth](https://www.naturalearthdata.com/), [TeleGeography](https://github.com/telegeography/www.submarinecablemap.com) (they shutdown this repo between last month and now it seems, their [FAQ](https://www2.telegeography.com/submarine-cable-faqs-frequently-asked-questions) states they no longer maintain and update a repo on GitHub, so I guess https://www.submarinecablemap.com/ itself is the source for it now)
<br>**Tools:** QGIS, Globe Builder plugin
<br>**Techniques:** same as Bounding Boxes map for Day 3: Polygons, just different colours
<br>**Inspiration:** 3 of my maps from earlier in the month: Bounding Boxes, Access Granted, and The Information Superhighway
<br>**Social Media:** view on [Twitter](https://twitter.com/ZER0D0TS/status/1597916431513178112) or [Mastodon](https://vis.social/@osgav/109517574574832166)

<br><br>
# 20 out of 30

[![all](/images/posts/30dmc/2022/all.jpg "Day 31: all of them!")](/images/posts/30dmc/2022/fullres/all.jpg)

I have to admit, a chunk of my motivation came from the idea of making this at the end of the month. It was inspired by Nelson Schäfer [who did it in 2021](https://nellomaps.com/30daymapchallenge-2021/).  

As promised here are a few links to some other such posts if you want to look at more maps:

**2021:**

- https://gisforthought.com/category/30daymapchallenge/
- https://www.helenmakesmaps.com/post/30daymapchallenge-2021-top-picks
- https://bogind.blogspot.com/2021/11/pokemaps-combining-30daymapchallenge.html

**2022:**

- https://david.frigge.nz/3RDayMapChallenge/
- https://ivabrunec.github.io/30daymap.html
- https://github.com/curatedmess/30DayMapChallenge
- https://antoniosmi.myportfolio.com/30daymapchallenge
- https://maptheclouds.com/playground/30-day-map-challenge-2022/meta/
- https://www.andrewdc.co.nz/project/30-day-map-challenge-2022/
- https://github.com/leeolney3/30DayMapChallenge
- https://github.com/petraduriancikova/30DayMapChallenge

That is but a *fraction* of collections from folks whose maps I saw this year – there will be a whole load more uploaded to the official [30DayMapChallenge](https://30daymapchallenge.com/) website very soon (and of course [previous](https://30daymapchallenge.com/2021/) [years'](https://30daymapchallenge.com/2020/) [collections](https://30daymapchallenge.com/2019/) are there right now). 

Happy mapping!
