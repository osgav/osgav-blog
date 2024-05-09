
+++
title = "weeknotes: week 36"
slug = "weeknotes-2022-36"
date = "2022-09-12T20:01:51Z"
draft = false
type = "weeknotes"
author = "osgav"
image = "images/headers/marianne-bos-unsplash.jpg"
collections = ["blog", "weeknotes"]
tags = ["GIS", "QGIS", "ArcGIS",]
+++

Things I got up to in the last week:

- GEOG 868: [Lesson 5: Working with Esri's Desktop Geodatabases](https://www.e-education.psu.edu/spatialdb/node/2015)
- read some of my [BCS cartography book](https://www.cartography.org.uk/cartography-an-introduction)
- accidentally started a website redesign project

Some rambles about each of those:

<!--more-->

##### **GEOG 868: Lesson 5**

*[Working with Esri's Desktop Geodatabases.](https://www.e-education.psu.edu/spatialdb/node/2015)* How will I do that though? I'm using QGIS. Well, it soon became apparent that I can "open" an Esri geodatabase in QGIS, or at least *view* the points / lines / polygons layers. Then I can export those layers and save them in my own GeoPackage and tada now I can edit the data too if I wish to. So this lesson became an exercise in seeing what I could translate from the ArcGIS world over to QGIS.

My quick summary of what I gathered from Lesson 5:

- **Attribute Domains**
  - this functionality can be replicated in QGIS, but not entirely
  - ArcGIS allows a "Domain" to exist separately to a "Feature Class" (a layer)
  - which means the Domain can be used by several Feature Classes
  - but in QGIS, the equivalent to a Domain, is configured and lives inside the layer configuration
  - the Domain details can be exported in a layer style `.qml` file...
  - but that doesn't necessarily make it easily apply-able to another layer...
- **Subtypes**
  - again this can be replicated in QGIS (perhaps entirely this time?)
  - it looks to be more straightforward in the ArcGIS GUI...
  - but having "lookup tables" over in PostGIS (as I did) might make more sense in a QGIS / PostGIS setup anyway...
  - also, this absolutely wasn't intuitive to figure out, I wouldn't have got there without the help of some threads I found on GIS stackexchange ([thread 1](https://gis.stackexchange.com/questions/43712/using-subtypes-and-domains-in-qgis-like-can-be-done-in-arcgis-desktop), [thread 2](https://gis.stackexchange.com/questions/156039/relation-reference-to-simulate-filtered-drop-down-lists), and mainly [thread 3](https://gis.stackexchange.com/questions/155195/limiting-list-values-based-on-previous-field-in-qgis-forms))
- **Geodatabase Topology**
  - this functionality can be replicated in QGIS, but not entirely
  - QGIS has the Topology Checker core plugin (once you enable it)...
  - but from the ArcGIS capabilities [described here](https://www.e-education.psu.edu/spatialdb/node/2024) it seemed to me that ArcGIS is quite superior in this area
  - however, I haven't delved any further than the Topology Checker plugin, so there may well be other plugins (or maybe even PyQGIS based workflows) that fill in gaps...

Overall it was pretty fun seeing how much of this lesson / project I could complete.


##### **BCS cartography book**

In the last week I read some of my [BCS cartography book](https://www.cartography.org.uk/cartography-an-introduction), which I'm considering a nice compliment to my plans to work through [GEOG 486](https://roam.libraries.psu.edu/node/1299). I didn't get any further through GEOG 486 in the last week though, so I've nothing else to mention on that front for now.


##### **oops, redesigned my website**

I decided to add a Portfolio page to my website, as a place to collect links to my blog posts about maps I've made. That entailed a little look at the code side of my website for the first time in a while, which naturally led to the classic situation where one thinks "I should update my website so its better". I tried to quell the desire with a quick browse of the [Hugo Themes](https://themes.gohugo.io/) site, which has worked in the past. I see some themes I like, I note them down, the desire to actually overhaul my website fades, life goes on. 

Not this time though. 

This time I found a theme that had a couple of aspects I particularly liked the sound of, so I took the next step and set up a test site. Just to play with and have a closer look, I told myself. Fast forward a few days and I have now committed to migrating from my current theme over to it. Oops. It will make for a nice Portfolio page though, and it'll fix or eliminate a few other little things I'd been meaning to get around with my current theme. I will save further rambles on this for later, once the redesign is live.

